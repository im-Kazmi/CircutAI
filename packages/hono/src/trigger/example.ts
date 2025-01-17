import { logger, task } from "@trigger.dev/sdk/v3";
import { getFileUrl, uploadFileToBucket } from "../../services/file-upload";
import { FileProcessingService } from "../../services/file-processing";
import { PineconeService } from "../../services/pinecone";
import { documentService } from "services";
import { Logger } from "@trigger.dev/sdk";
import { chunkText } from "helpers/file-processing";
import { randomUUID } from "crypto";
import { v4 as uuid } from "uuid";

export type SerializedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  content: number[];
};

interface DocumentProcessingPayload {
  files: SerializedFile[];
  memoryId: string;
  userId: string;
  orgId: string;
}

export const uploadAndProcessDocument = task({
  id: "upload-and-process-document",
  maxDuration: 300,
  run: async (payload: DocumentProcessingPayload, { ctx }) => {
    const { files, memoryId, userId, orgId } = payload;
    const fileProcessingService = new FileProcessingService();
    const pineconeService = new PineconeService();

    if (!files || files.length === 0) {
      logger.error("No files provided for processing");
      return;
    }

    if (!memoryId || !userId || !orgId) {
      logger.error("Missing required fields: memoryId, userId, or orgId");
      return;
    }

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        logger.error(`File too large: ${file.name}`);
        continue;
      }

      if (!["text/plain", "application/pdf"].includes(file.type)) {
        logger.error(`Unsupported file type: ${file.name}`);
        continue;
      }

      try {
        const uploadedFile = await uploadFileToBucket(file);

        if (!uploadedFile || !uploadedFile.Key) {
          logger.error(`File upload failed for: ${file.name}`);
          return;
        }

        const fileUrl = await getFileUrl({ key: uploadedFile.Key! });

        const document = await documentService.createDocument(orgId, memoryId, {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileUrl,
        });

        const fileContent = await fileProcessingService.processFile(
          fileUrl,
          file.name,
        );

        const chunks = chunkText(fileContent);

        const embeddingData = chunks.map((chunk, index) => ({
          text: chunk,
          metadata: {
            text: chunk,
            documentId: document.id,
            chunkIndex: index,
            fileName: file.name,
          },
        }));

        const embeddingsResponse =
          await pineconeService.generateEmbeddings(embeddingData);

        if (!embeddingsResponse || !embeddingsResponse.data) {
          logger.error("Failed to generate embeddings", { file: file.name });
          return;
        }

        const embeddings = embeddingsResponse.data;

        const data = embeddings.map((embedding, index) => ({
          id: uuid(),
          values: embedding.values!,
          metadata: embeddingData[index].metadata,
        }));

        await pineconeService.storeEmbeddings({
          embeddings: data,
          memoryId,
        });
        await documentService.updateStatus(document.id, "INDEXED");

        logger.info(`Document processed successfully: ${document.id}`);
        return fileContent;
      } catch (error) {
        logger.error(
          `Error processing file: ${file.name}, memoryId: ${memoryId}, orgId: ${orgId}`,
          {
            error: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : undefined,
          },
        );
      }
    }
  },
});
