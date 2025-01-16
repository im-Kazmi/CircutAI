import { logger, task } from "@trigger.dev/sdk/v3";
import { getFileUrl, uploadFileToBucket } from "services/file-upload";
import axios from "axios";

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

    for (const file of files) {
      try {
        const uploadedFile = await uploadFileToBucket(file);

        // Create document record
        // const document = await documentService.createDocument(orgId, memoryId, {
        //   fileName: file.name,
        //   fileType: file.type,
        //   fileSize: file.size,
        //   fileUrl,
        // });

        // Generate embeddings
        // const embeddings = await generateEmbeddings(chunks);

        // Store embeddings in Pinecone
        // await storeEmbeddings(embeddings, document.id);

        // Update document status
        // await documentService.updateStatus(document.id, "processed");

        // logger.info(`Document processed successfully: ${document.id}`);
      } catch (error) {
        logger.error(`Error processing document: ${file.name}`);
      }
    }

    return { files, memoryId, userId, orgId };
  },
});
