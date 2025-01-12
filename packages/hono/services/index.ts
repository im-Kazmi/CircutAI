import { prisma } from "@repo/database";
import { Dependency } from "../helpers/dependency";
import { CircutService } from "./circut";
import { OrganizationService } from "./org";
import { UserService } from "./user";
import { WebhookService } from "./webhooks";
import { MemoryService } from "./memory";
import { DocumentService } from "./document";

export const userService = new UserService(prisma);
export const orgService = new OrganizationService(prisma);
export const circutService = new CircutService(prisma);
export const memoryService = new MemoryService(prisma);
export const webhookService = new WebhookService(prisma);
export const documentService = new DocumentService(prisma);

export const userHonoService = new Dependency(
  (c, prisma, auth) => new UserService(prisma),
);

export const circutHonoService = new Dependency(
  (c, prisma, auth) => new CircutService(prisma),
);

export const memoryHonoService = new Dependency(
  (c, prisma, auth) => new MemoryService(prisma),
);

export const documentHonoService = new Dependency(
  (c, prisma, auth) => new DocumentService(prisma),
);

export const orgHonoService = new Dependency(
  (c, prisma, auth) => new OrganizationService(prisma),
);

export const webhookHonoService = new Dependency(
  (c, prisma, auth) => new WebhookService(prisma),
);
