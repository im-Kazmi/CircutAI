import { DocumentProcessingStatus, prisma, Prisma } from "@repo/database";
import { BaseService } from "./base-service";
import { PaginationParams, QueryUtils, SortingParams } from "../utils/query";
import { memoryService } from "services";

export class DocumentService extends BaseService {
  async list(
    memoryId: string,
    orgId: string,
    params: PaginationParams & SortingParams<keyof Prisma.DocumentSelect>,
  ) {
    const { skip, take } = QueryUtils.getPaginationParams(params);
    const orderBy = QueryUtils.getSortingParams(params);

    const memory = await memoryService.getMemoryByIdandOrg(memoryId, orgId);

    if (!memory) {
      throw new Error("cannot find memory with this id and org.");
    }

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
    orgId: string,
    memoryId: string,
    values: Omit<Prisma.DocumentCreateInput, "memory">,
  ) {
    try {
      const memory = await memoryService.getMemoryByIdandOrg(memoryId, orgId);

      if (!memory) {
        throw new Error("cannot find memory with this id and org.");
      }
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

  async deleteDocument(memoryId: string, orgId: string, id: string) {
    try {
      const memory = await memoryService.getMemoryByIdandOrg(memoryId, orgId);

      if (!memory) {
        throw new Error("cannot find memory with this id and org.");
      }

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
    orgId: string,
    values: Prisma.DocumentUpdateInput,
  ) {
    try {
      const memory = await memoryService.getMemoryByIdandOrg(memoryId, orgId);

      if (!memory) {
        throw new Error("cannot find memory with this id and org.");
      }

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

  async updateStatus(documentId: string, status: DocumentProcessingStatus) {
    return prisma.document.update({
      where: { id: documentId },
      data: { processingStatus: status },
    });
  }
}
