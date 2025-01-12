import {
  authMiddleware,
  requireAdmin,
  requireMember,
} from "../middlewares/permission";
import { Hono } from "hono";

const app = new Hono()
  .use(requireMember(), authMiddleware())
  .get("/", async (c) => {
    const user = c.get("user");
    return c.json(user);
  });

export default app;
