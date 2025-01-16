import { fileUploadingQueue } from "@repo/hono/quirrel/tasks/upload-files";
import { Queue } from "quirrel/next";
import { uploadFileToBucket } from "@repo/hono/services/file-upload";
import { FileProcessingService } from "@repo/hono/services/file-processing";

const fileProcessor = new FileProcessingService();

export const POST = Queue("api/queues/file-uploading", async (payload: any) => {
  try {
    const uploadedFiles = await Promise.all(
      payload.files.map(async (file: File) => {
        const uploadedFile = await uploadFileToBucket(file, file.name);
        return {
          ...file,
          documentUrl: uploadedFile.Location,
        };
      }),
    );

    for (const uploaded of uploadedFiles) {
      const processedContent = await fileProcessor.processFile(
        uploaded.documentUrl!,
      );
      console.log(processedContent);
    }
  } catch (err) {
    console.log(err);
  }
});
