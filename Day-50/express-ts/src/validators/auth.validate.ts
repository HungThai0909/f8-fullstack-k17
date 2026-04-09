import z from "zod";
import { userService } from "../services/user.service";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Email invalid"))
    .refine(
      async (email: string) => {
        const existing = await userService.existingEmail(email);
        return !existing;
      },
      {
        message: "Email is exist",
      },
    ),
  password: z.string().min(6, "Password min 6 charactor"),
});

export const resetPasswordSchema = z
  .object({
    userId: z.coerce.number().int().positive("userId is required"),
    otp: z.string().min(6, "OTP is required"),
    newPassword: z.string().min(6, "Password min 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });