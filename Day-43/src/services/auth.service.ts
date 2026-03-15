import type { RegisterInput, LoginInput } from "../schemas/auth.schema";
import type { User, UserPublic } from "../types/user.type";

const users: User[] = [];

export const authService = {
  register: (data: RegisterInput): UserPublic => {
    const existingUser = users.find((u) => u.email === data.email);

    if (existingUser) {
      const error = new Error("Email đã được sử dụng");
      (error as Error & { statusCode: number }).statusCode = 409;
      throw error;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: data.email,
      fullName: data.fullName,
      password: data.password,
      createdAt: new Date(),
    };

    users.push(newUser);

    const { password: _password, ...userPublic } = newUser;
    return userPublic;
  },

  login: (data: LoginInput): UserPublic => {
    const user = users.find((u) => u.email === data.email);

    if (!user) {
      const error = new Error("Email hoặc mật khẩu không đúng");
      (error as Error & { statusCode: number }).statusCode = 401;
      throw error;
    }

    if (user.password !== data.password) {
      const error = new Error("Email hoặc mật khẩu không đúng");
      (error as Error & { statusCode: number }).statusCode = 401;
      throw error;
    }

    const { password: _password, ...userPublic } = user;
    return userPublic;
  },
};