import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự"),
  desc: z.string().optional(),
  price: z.number("Giá là bắt buộc").positive("Giá phải lớn hơn 0"),
  stock: z.number().int().min(0, "Số lượng không được âm").default(0).optional(),
  userId: z.number("userId là bắt buộc").int(),
});

export const updateProductSchema = z
  .object({
    name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự").optional(),
    desc: z.string().optional(),
    price: z.number().positive("Giá phải lớn hơn 0").optional(),
    stock: z.number().int().min(0, "Số lượng không được âm").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Body không được rỗng",
  });

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;