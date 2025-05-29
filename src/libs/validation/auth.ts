import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Введіть коректну електронну пошту' }),
  password: z.string().min(6, { message: 'Пароль має містити щонайменше 6 символів' }),
});

export const signUpSchema = z.object({
  email: z.string().email({ message: 'Введіть коректну електронну пошту' }),

  password: z
    .string()
    .min(8, { message: 'Пароль має містити щонайменше 8 символів' })
    .max(100, { message: 'Пароль має містити не більше 100 символів' })
    .regex(/[a-z]/, { message: 'Пароль повинен містити хоча б одну малу літеру' })
    .regex(/[A-Z]/, { message: 'Пароль повинен містити хоча б одну велику літеру' })
    .regex(/[0-9]/, { message: 'Пароль повинен містити хоча б одну цифру' })
    .regex(/[^A-Za-z0-9]/, { message: 'Пароль повинен містити хоча б один спеціальний символ' }),
});

export type SignInData = z.infer<typeof signInSchema>;
export type SignUpData = z.infer<typeof signUpSchema>;
