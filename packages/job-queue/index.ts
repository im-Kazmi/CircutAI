import { QuirrelLogger } from "quirrel";
import { Queue, QuirrelJobHandler } from "quirrel/next-app";

export function createQueue<T>(
  path: string,
  handler: (job: QuirrelJobHandler<T>) => Promise<void>,
  options?: {
    retries: (string | number)[] | undefined;
    exclusive: boolean;
    logger: QuirrelLogger<unknown> | undefined;
  },
) {
  return Queue(path, handler, options);
}
