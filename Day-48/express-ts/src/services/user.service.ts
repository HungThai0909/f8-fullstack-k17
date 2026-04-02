import { UserFindManyArgs, UserWhereInput } from "../generated/prisma/models";
import { UserQuery } from "../types/user.type";
import { prisma } from "../utils/prisma";

export const userService = {
  findAll({ status, s, page = 1, limit = 3, select = "" }: UserQuery) {
    const filters = {} as UserWhereInput;
    // const subFilters = {} as UserWhereInput[];
    if (["true", "false"].includes(status)) {
      filters.status = status === "true";
    }
    // if (s) {
    //   subFilters.push({
    //     name: {
    //       contains: s,
    //       mode: "insensitive",
    //     },
    //   });
    // }
    // filters.OR = subFilters;
    if (s) {
      filters.OR = [
        {
          name: {
            contains: status,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: status,
            mode: "insensitive",
          },
        },
      ];
    }
    const offset = (page - 1) * limit;
    type SelectType = { [key: string]: boolean };
    const fields = select
      .trim()
      .split(",")
      .filter((item) => item)
      .reduce((acc, cur) => {
        acc[cur.trim()] = true;
        return acc;
      }, {} as SelectType);
    const options = {
      where: {
        ...filters,
        posts: {
          //none: {}, // có ít nhất 1 posts
          // some: {
          //   title: {
          //     contains: "t 1",
          //   },
          // },
        },
      },
      take: limit,
      skip: offset,
      orderBy: {
        id: "desc",
      },
      include: {
        phone: true,
        posts: true,
      },
    } as UserFindManyArgs;
    if (Object.keys(fields).length) {
      options.select = fields;
    }
    options.select = {
      ...options.select,
      _count: {
        select: {
          posts: true,
        },
      },
    };
    return Promise.all([
      prisma.user.findMany(options),
      prisma.user.count({
        where: {
          ...filters,
        },
      }),
    ]);
  },
  async find(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  },
  create({
    phone,
    ...userData
  }: {
    name: string;
    email: string;
    status: boolean;
    phone: string;
  }) {
    return prisma.user.create({
      data: {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
        phone: {
          create: {
            phone,
          },
        },
      },
    });
  },
  update(
    {
      phone,
      ...userData
    }: { name: string; email: string; status: boolean; phone: string },
    id: number,
  ) {
    return prisma.user.update({
      where: { id },
      data: {
        ...userData,
        phone: {
          upsert: {
            where: {
              userId: id,
            },
            create: { phone },
            update: {
              phone,
            },
          },
        },
      },
    });
  },
  delete(id: number) {
    return prisma.$transaction([
      prisma.phone.delete({
        where: {
          userId: id,
        },
      }),
      prisma.user.delete({
        where: { id },
      }),
    ]);
  },
};
