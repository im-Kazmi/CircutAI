import { Dependency } from "../helpers/dependency";
import { CircutService } from "./circut";
import { UserService } from "./user";

export const userHonoService = new Dependency(
  (c, prisma, auth) => new UserService(prisma),
);

export const circutHonoService = new Dependency(
  (c, prisma, auth) => new CircutService(prisma),
);
