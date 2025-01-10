import { prisma, Prisma } from "@repo/database";
import { BaseService } from "./base-service";
import { PaginationParams, QueryUtils, SortingParams } from "@/utils/query";

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
        memoryAudit: true,
      },
      skip,
      take,
      orderBy,
    });

    return QueryUtils.paginateQuery(query, this.prisma.memory, params);
  }

  async createCircut(
    orgId: string,
    values: Omit<Prisma.CircutCreateInput, "org">,
  ) {
    try {
      const circut = await prisma.circut.create({
        data: {
          ...values,
          org: {
            connect: {
              id: orgId,
            },
          },
        },
      });

      return circut;
    } catch (error) {
      throw new Error(`Error creating circut: ${(error as Error).message}`);
    }
  }

  async deleteCircut(orgId: string, id: string) {
    try {
      const exists = await this.getCircutByIdandOrg(id, orgId);

      if (!exists) {
        throw new Error(`circut does not exists with this id.`);
      }

      await prisma.circut.delete({
        where: { id, orgId },
      });
      return { message: "circut deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting circut: ${(error as Error).message}`);
    }
  }

  async updateCircut(
    id: string,
    orgId: string,
    values: Prisma.CircutUpdateInput,
  ) {
    try {
      const exists = await this.getCircutByIdandOrg(id, orgId);

      if (!exists) {
        throw new Error(`circut does not exists with this id.`);
      }

      const updatedCircut = await prisma.circut.update({
        where: { id, orgId },
        data: values,
      });
      return updatedCircut;
    } catch (error) {
      throw new Error(`Error updating circut: ${(error as Error).message}`);
    }
  }

  async getCircutById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { clerkId: id },
      });

      return user;
    } catch (error) {
      throw new Error(`Error retrieving user: ${(error as Error).message}`);
    }
  }
  async getCircutByIdandOrg(id: string, orgId: string) {
    try {
      const circut = await prisma.circut.findUnique({
        where: { id, orgId },
      });

      return circut;
    } catch (error) {
      throw new Error(`Error retrieving circut: ${(error as Error).message}`);
    }
  }
}
