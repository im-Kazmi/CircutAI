import { prisma, Prisma } from "@repo/database";
import { BaseService } from "./base-service";
import { PaginationParams, QueryUtils, SortingParams } from "../utils/query";

export class MemoryService extends BaseService {
  list(
    params: PaginationParams & SortingParams<keyof Prisma.MemorySelect>,
    orgId: string,
  ) {
    const { skip, take } = QueryUtils.getPaginationParams(params);
    const orderBy = QueryUtils.getSortingParams(params);

    const query = this.prisma.memory.findMany({
      where: {
        orgId,
      },
      include: {
        Document: true,
      },
      skip,
      take,
      orderBy,
    });

    return QueryUtils.paginateQuery(query, this.prisma.memory, params);
  }

  async createMemory(
    orgId: string,
    values: Omit<Prisma.MemoryCreateInput, "org">,
  ) {
    try {
      const memory = await prisma.memory.create({
        data: {
          ...values,
          org: {
            connect: {
              id: orgId,
            },
          },
        },
      });

      return memory;
    } catch (error) {
      throw new Error(`Error creating memory: ${(error as Error).message}`);
    }
  }

  async deleteMemory(orgId: string, id: string) {
    try {
      const exists = await this.getMemoryByIdandOrg(id, orgId);

      if (!exists) {
        throw new Error(`memory does not exists with this id.`);
      }

      await prisma.memory.delete({
        where: { id, orgId },
      });
      return { message: "memory deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting memory: ${(error as Error).message}`);
    }
  }

  async updateMemory(
    id: string,
    orgId: string,
    values: Prisma.MemoryUpdateInput,
  ) {
    try {
      const exists = await this.getMemoryByIdandOrg(id, orgId);

      if (!exists) {
        throw new Error(`memory does not exists with this id.`);
      }

      const updatedMemory = await prisma.memory.update({
        where: { id, orgId },
        data: values,
      });
      return updatedMemory;
    } catch (error) {
      throw new Error(`Error updating memory: ${(error as Error).message}`);
    }
  }

  async getMemoryById(id: string) {
    try {
      const memory = await prisma.memory.findUnique({
        where: { id },
      });

      return memory;
    } catch (error) {
      throw new Error(`Error retrieving memory: ${(error as Error).message}`);
    }
  }
  async getMemoryByIdandOrg(id: string, orgId: string) {
    try {
      const memory = await prisma.memory.findUnique({
        where: { id, orgId },
      });

      return memory;
    } catch (error) {
      throw new Error(`Error retrieving memory: ${(error as Error).message}`);
    }
  }
}
