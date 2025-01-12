import { createQueue } from "@repo/quirrel";

// Create the test queue
const testQueue = createQueue(
  "api/test-queue",
  async (job: { message: string }) => {
    console.log(`Processing job with message: "${job.message}"`);
    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`Job processed: "${job.message}"`);
  },
);

export const POST = testQueue;
