import { prisma, Prisma, LLMType } from "@repo/database";
import { BaseService } from "./base-service";
import { PaginationParams, QueryUtils, SortingParams } from "../utils/query";
import { encryptApiKey, decryptApiKey } from "../utils/encryption";

export class APIKeyService extends BaseService {
  list(
    params: PaginationParams & SortingParams<keyof Prisma.APIKeySelect>,
    orgId: string,
  ) {
    const { skip, take } = QueryUtils.getPaginationParams(params);
    const orderBy = QueryUtils.getSortingParams(params);

    const query = this.prisma.aPIKey.findMany({
      where: {
        orgId,
        revokedAt: null,
      },
      select: {
        id: true,
        type: true,
        createdAt: true,
      },
      skip,
      take,
      orderBy,
    });

    return QueryUtils.paginateQuery(query, this.prisma.aPIKey, params);
  }

  async createAPIKey(orgId: string, values: { type: LLMType; key: string }) {
    try {
      const { encryptedKey, iv, tag } = encryptApiKey(values.key);
      const apiKey = await prisma.aPIKey.create({
        data: {
          type: values.type,
          key: encryptedKey,
          iv,
          org: {
            connect: {
              id: orgId,
            },
          },
        },
      });

      return { ...apiKey, key: values.key };
    } catch (error) {
      throw new Error(`Error creating API key: ${(error as Error).message}`);
    }
  }

  async revokeAPIKey(orgId: string, id: string) {
    try {
      const exists = await this.getAPIKeyByIdAndOrg(id, orgId);

      if (!exists) {
        throw new Error(`API key does not exist with this id.`);
      }

      await prisma.aPIKey.update({
        where: { id, orgId },
        data: { revokedAt: new Date() },
      });
      return { message: "API key revoked successfully" };
    } catch (error) {
      throw new Error(`Error revoking API key: ${(error as Error).message}`);
    }
  }

  async getAPIKeyByIdAndOrg(id: string, orgId: string) {
    try {
      const apiKey = await prisma.aPIKey.findUnique({
        where: { id, orgId },
      });

      if (apiKey && apiKey.key) {
        const decryptedKey = decryptApiKey({
          encryptedKey: apiKey.key,
          iv: apiKey.iv,
          tag: apiKey.iv,
        });
        return { ...apiKey, key: decryptedKey };
      }

      return apiKey;
    } catch (error) {
      throw new Error(`Error retrieving API key: ${(error as Error).message}`);
    }
  }

  async getAPIKeyByType(orgId: string, type: LLMType) {
    try {
      const apiKey = await prisma.aPIKey.findFirst({
        where: { orgId, type, revokedAt: null },
      });

      if (apiKey && apiKey.key) {
        const decryptedKey = decryptApiKey({
          encryptedKey: apiKey.key,
          iv: apiKey.iv,
          tag: apiKey.iv,
        });
        return { ...apiKey, key: decryptedKey };
      }

      return apiKey;
    } catch (error) {
      throw new Error(`Error retrieving API key: ${(error as Error).message}`);
    }
  }
}
