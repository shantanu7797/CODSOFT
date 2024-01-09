import { User } from "@prisma/client";

export type ExtendedPost = Post & {
    author: User;
}