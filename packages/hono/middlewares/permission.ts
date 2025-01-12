import { ClerkAuth } from "../types";
import { auth } from "@repo/auth/server";
import { createMiddleware } from "hono/factory";

type Env = {
  Variables: {
    user: ClerkAuth;
  };
};

export const authMiddleware = () => {
  return createMiddleware<Env>(async (c, next) => {
    const session = await auth();

    if (!session || !session.userId) {
      return c.json("UNAUTHORIZED", 400);
    }

    c.set("user", session);

    await next();
  });
};

export const requireAdmin = () => {
  return createMiddleware<Env>(async (c, next) => {
    const session = await auth();

    if (!session || !session.userId) {
      return c.json("UNAUTHORIZED", 400);
    }

    const isAdmin = session.has({ role: "org:admin" });

    if (!isAdmin) {
      return c.json("You dont have admin permissions.", 400);
    }

    await next();
  });
};

export const requireMember = () => {
  return createMiddleware<Env>(async (c, next) => {
    const session = await auth();

    if (!session || !session.userId) {
      return c.json("UNAUTHORIZED", 400);
    }

    const isMember =
      session.has({ role: "org:member" }) || session.has({ role: "org:admin" });

    if (!isMember) {
      return c.json("You dont have member permissions", 400);
    }

    await next();
  });
};
