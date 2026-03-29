import { prisma } from "../utils/prisma";

export const productService = {
  findAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async find(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  },

  create(productData: { name: string; price: number; description?: string }) {
    return prisma.product.create({
      data: {
        ...productData,
        createdAt: new Date(),
      },
    });
  },

  async update(id: number, productData: { name?: string; price?: number; description?: string }) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("Product not found");
    }
    return prisma.product.update({
      where: { id },
      data: productData,
    });
  },

  async delete(id: number) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("Product not found");
    }
    return prisma.product.delete({ where: { id } });
  },
};