import { cache } from "../utils/cache";
import { prisma } from "../utils/prisma";

export const productService = {
  findAll() {
    return cache.remember(`products:list`, () =>
      prisma.product.findMany({
        orderBy: {
          id: "desc",
        },
      }),
    );
  },
  async create(productData: {
    name: string;
    price: number;
    description: string;
  }) {
    const product = await prisma.product.create({
      data: productData,
    });
    cache.forget("products:list"); //invalidate
    return product;
  },
 
};
