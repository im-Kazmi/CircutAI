import { Queue } from "quirrel/next-app";
import { prisma } from "@repo/database";
import { FileProcessingService } from "services/file-processing";

interface FileProcessingPayload {
  documentUrl: string;,
  fileSize:number,
  fileType:string,
  fileName:string,

}
export const fileProcessingQueue = Queue(
  "api/queues/email",
  async (payload: FileProcessingPayload) => {
    const { documentUrl } = payload;
    const fileProcessor = new FileProcessingService();
    const processedContent = await fileProcessor.processFile(documentUrl);

    await prisma.document.create({
      data: {
        extractedContent: processedContent,
        fileName:payload.fileName,
        fileType:payload.fileType,
        fileSize:payload.fileSize,
        filePath:payload.documentUrl,
      },
    });
  },
);
