export type User = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  createdAt: Date;
};

export type UserPublic = Omit<User, "password">;

declare module "express" {
  export interface Request {
    user?: {
      name: string;
    };
  }
}