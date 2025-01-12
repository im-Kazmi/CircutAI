import { prisma, Prisma } from "@repo/database";
import { BaseService } from "./base-service";
import { PaginationParams, QueryUtils, SortingParams } from "../utils/query";

export class DocumentService extends BaseService {
  list(
    params: PaginationParams & SortingParams<keyof Prisma.DocumentSelect>,
    memoryId: string,
  ) {
    const { skip, take } = QueryUtils.getPaginationParams(params);
    const orderBy = QueryUtils.getSortingParams(params);

    const query = this.prisma.document.findMany({
      where: {
        memoryId,
      },
      skip,
      take,
      orderBy,
    });

    return QueryUtils.paginateQuery(query, this.prisma.document, params);
  }

  async createDocument(
    memoryId: string,
    values: Omit<Prisma.DocumentCreateInput, "org">,
  ) {
    try {
      const document = await prisma.document.create({
        data: {
          ...values,
          memory: {
            connect: {
              id: memoryId,
            },
          },
        },
      });

      return document;
    } catch (error) {
      throw new Error(`Error creating document: ${(error as Error).message}`);
    }
  }

  async deleteDocument(memoryId: string, id: string) {
    try {
      const exists = await this.getDocumentByIdandMemory(id, memoryId);

      if (!exists) {
        throw new Error(`document does not exists with this id.`);
      }

      await prisma.document.delete({
        where: { id, memoryId },
      });
      return { message: "document deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting document: ${(error as Error).message}`);
    }
  }

  async updateDocument(
    id: string,
    memoryId: string,
    values: Prisma.DocumentUpdateInput,
  ) {
    try {
      const exists = await this.getDocumentByIdandMemory(id, memoryId);

      if (!exists) {
        throw new Error(`document does not exists with this id and memoryId.`);
      }

      const updatedDocument = await prisma.document.update({
        where: { id, memoryId },
        data: values,
      });
      return updatedDocument;
    } catch (error) {
      throw new Error(`Error updating document: ${(error as Error).message}`);
    }
  }

  async getDocumentById(id: string) {
    try {
      const document = await prisma.document.findUnique({
        where: { id },
      });

      return document;
    } catch (error) {
      throw new Error(`Error retrieving document: ${(error as Error).message}`);
    }
  }
  async getDocumentByIdandMemory(id: string, memoryId: string) {
    try {
      const document = await prisma.document.findUnique({
        where: { id, memoryId },
      });

      return document;
    } catch (error) {
      throw new Error(`Error retrieving document: ${(error as Error).message}`);
    }
  }
}
