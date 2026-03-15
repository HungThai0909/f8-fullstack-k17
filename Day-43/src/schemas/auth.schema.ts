import z from "zod";

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .pipe(z.email("Email không đúng định dạng")),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
  fullName: z.string().min(1, "Họ tên không được để trống"),
});

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được để trống")
    .pipe(z.email("Email không đúng định dạng")),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự"),
});

export { registerSchema, loginSchema };

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;