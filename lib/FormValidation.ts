import { ZodType, z } from 'zod';

interface signUpFormData {
  name: string;
  email: string;
  password: string;
}

export const signUpFormSchema: ZodType<signUpFormData> = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Username must be 2 or more chars.' })
    .nonempty(),
  email: z.string().trim().email().toLowerCase().nonempty(),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password at list 6 chars.' })
    .max(10, { message: 'Password at most 10 chars' })
    .nonempty(),
});

interface signInFormData {
  email: string;
  password: string;
}

export const signInFormSchema: ZodType<signInFormData> = z.object({
  email: z.string().trim().email().toLowerCase().nonempty(),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be 6 chars.' })
    .max(10, { message: 'Password should be less then 10 chars' })
    .nonempty(),
});
