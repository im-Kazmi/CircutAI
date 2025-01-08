import { Dependency } from "@/helpers/dependency";
import { prisma } from "@repo/database";
import { UserService } from "./user";

export const userHonoService = new Dependency(
  (c, prisma, auth) => new UserService(prisma),
);
