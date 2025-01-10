import { Dependency } from "../helpers/dependency";
import { UserService } from "./user";

export const userHonoService = new Dependency(
  (c, prisma, auth) => new UserService(prisma),
);
