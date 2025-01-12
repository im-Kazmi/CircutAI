import { QuirrelLogger } from "quirrel";
import { Queue, QuirrelJobHandler } from "quirrel/next-app";
export declare function createQueue<T>(path: string, handler: (job: QuirrelJobHandler<T>) => Promise<void>, options?: {
    retries: (string | number)[] | undefined;
    exclusive: boolean;
    logger: QuirrelLogger<unknown> | undefined;
}): Queue<QuirrelJobHandler<T>> & ((req: Request) => Response | Promise<Response>);
//# sourceMappingURL=index.d.ts.map