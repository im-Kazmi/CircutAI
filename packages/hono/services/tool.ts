import { prisma, Prisma } from "@repo/database";
import { BaseService } from "./base-service";
import { PaginationParams, QueryUtils, SortingParams } from "../utils/query";

export class ToolService extends BaseService {
  list(
    params: PaginationParams & SortingParams<keyof Prisma.ToolSelect>,
    orgId: string,
  ) {
    const { skip, take } = QueryUtils.getPaginationParams(params);
    const orderBy = QueryUtils.getSortingParams(params);

    const query = this.prisma.tool.findMany({
      where: {
        CircutTool: {
          some: {
            circut: {
              orgId,
            },
          },
        },
      },
      include: {
        CircutTool: true,
      },
      skip,
      take,
      orderBy,
    });

    return QueryUtils.paginateQuery(query, this.prisma.tool, params);
  }

  async createTool(values: Omit<Prisma.ToolCreateInput, "CircutTool">) {
    try {
      const tool = await prisma.tool.create({
        data: values,
      });

      return tool;
    } catch (error) {
      throw new Error(`Error creating tool: ${(error as Error).message}`);
    }
  }

  async deleteTool(id: string) {
    try {
      const exists = await this.getToolById(id);

      if (!exists) {
        throw new Error(`Tool does not exist with this id.`);
      }

      await prisma.tool.delete({
        where: { id },
      });
      return { message: "Tool deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting tool: ${(error as Error).message}`);
    }
  }

  async updateTool(id: string, values: Prisma.ToolUpdateInput) {
    try {
      const exists = await this.getToolById(id);

      if (!exists) {
        throw new Error(`Tool does not exist with this id.`);
      }

      const updatedTool = await prisma.tool.update({
        where: { id },
        data: values,
      });
      return updatedTool;
    } catch (error) {
      throw new Error(`Error updating tool: ${(error as Error).message}`);
    }
  }

  async getToolById(id: string) {
    try {
      const tool = await prisma.tool.findUnique({
        where: { id },
        include: {
          CircutTool: {
            include: {
              circut: true,
            },
          },
        },
      });

      return tool;
    } catch (error) {
      throw new Error(`Error retrieving tool: ${(error as Error).message}`);
    }
  }

  async getToolsByCircutId(circutId: string) {
    try {
      const tools = await prisma.tool.findMany({
        where: {
          CircutTool: {
            some: {
              circutId,
            },
          },
        },
        include: {
          CircutTool: true,
        },
      });

      return tools;
    } catch (error) {
      throw new Error(`Error retrieving tools: ${(error as Error).message}`);
    }
  }
}
