import { Queue } from "quirrel/next-app";
import { prisma } from "@repo/database";
import { FileProcessingService } from "services/file-processing";

interface FileProcessingPayload {
  documentId: string;
  memoryId: string;
}
export const fileProcessingQueue = Queue(
  "api/queues/email",
  async (payload: FileProcessingPayload) => {
    const { documentId, memoryId } = payload;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new Error(`Document with ID ${documentId} not found`);
    }

    const fileProcessor = new FileProcessingService();
    const processedContent = await fileProcessor.processFile(document);

    // Update the document with processed content
    await prisma.document.update({
      where: { id: documentId },
      data: { extractedContent: processedContent },
    });
  },
);
