import { prisma } from "../utils/prisma";
import { CreateProductDto, UpdateProductDto } from "../validators/product.validator";
import { ProductQuery } from "../types/product.type";
import { Prisma } from "../generated/prisma/client";

const notFoundError = (message: string, cause: unknown) =>
  new Error(message, { cause });

export const productService = {
  async create(data: CreateProductDto) {
    const { userId, ...rest } = data;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    return prisma.product.create({
      data: {
        name: rest.name,
        price: rest.price,
        stock: rest.stock ?? 0,
        userId,
        created_at: new Date(),
        updated_at: new Date(),
        ...(rest.desc !== undefined && { desc: rest.desc }),
      },
    });
  },

  async findAll({ userId, q, page = 1, limit = 10 }: ProductQuery) {
    const safeLimit = Math.min(limit, 50);
    const offset = (page - 1) * safeLimit;

    const filters = {} as Prisma.ProductWhereInput;

    if (userId) {
      filters.userId = Number(userId);
    }

    if (q) {
      filters.name = { contains: q, mode: "insensitive" };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where: filters,
        skip: offset,
        take: safeLimit,
        orderBy: { id: "desc" },
      }),
      prisma.product.count({ where: filters }),
    ]);

    return {
      data: products,
      pagination: {
        total,
        page,
        limit: safeLimit,
        totalPages: Math.ceil(total / safeLimit),
      },
    };
  },

  async findOne(id: number) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    if (!product) throw new Error("Product not found");

    const { user, ...rest } = product;
    return { ...rest, createdBy: user };
  },

 async update(id: number, data: UpdateProductDto) {
  try {
    return await prisma.product.update({
      where: { id },
      data: { ...data, updated_at: new Date() } as Prisma.ProductUpdateInput,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw notFoundError("Product not found", error);
    }
    throw error;
  }
},

  async delete(id: number) {
    try {
      return await prisma.product.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw notFoundError("Product not found", error);
      }
      throw error;
    }
  },
};