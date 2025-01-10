import { prisma, Prisma } from "@repo/database";
import { BaseService } from "./base-service";

export class CircutService extends BaseService {
  async createCircut(values: Prisma.CircutCreateInput) {
    try {
      const circut = await prisma.circut.create({
        data: values,
      });

      return circut;
    } catch (error) {
      throw new Error(`Error creating circut: ${(error as Error).message}`);
    }
  }

  async deleteCircut(id: string) {
    try {
      await prisma.circut.delete({
        where: { id },
      });
      return { message: "circut deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting circut: ${(error as Error).message}`);
    }
  }

  async updateCircut(id: string, values: Prisma.CircutUpdateInput) {
    try {
      const exists = await this.getCircutById(id);

      if (!exists) {
        throw new Error(`circut does not exists with this id.`);
      }

      const updatedUser = await prisma.user.update({
        where: { clerkId: id },
        data: values,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${(error as Error).message}`);
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
}
