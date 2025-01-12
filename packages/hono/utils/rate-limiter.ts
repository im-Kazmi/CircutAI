import { Context } from "hono";
import { getIp } from "../helpers/get-ip";
import { rateLimiter } from "hono-rate-limiter";

export const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  keyGenerator: async (c: Context) => {
    const ip = getIp(c);
    return ip!;
  },
});
