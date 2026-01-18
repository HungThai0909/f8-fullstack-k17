import { z } from 'zod';

export const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  age: z.string().min(1, 'Age is required').regex(/^\d+$/, 'Age must be a number'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export const step2Schema = z.object({
  username: z.string().min(1, 'Username is required'),
});

export const step3Schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const step4Schema = z.object({
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
});