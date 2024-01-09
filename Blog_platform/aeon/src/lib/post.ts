import { z } from 'zod';

export const PostValidator = z.object({
    title: z
        .string()
        .min(3, {
            message: "Title must be at least 3 characters long"
        })
        .max(120, {
            message: "Title must be less than 120 characters long"
        }),
    content: z.any()
});

export type PostCreationRequest = z.infer<typeof PostValidator>;