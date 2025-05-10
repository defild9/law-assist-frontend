import { z } from 'zod';

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  profile_picture: z.string().url().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
