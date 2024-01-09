import { z } from 'zod'

export const UserValidator = z.object({
    bio: z
        .string()
        .min(3)
        .max(32)
});

export type UserRequest = z.infer<typeof UserValidator>;