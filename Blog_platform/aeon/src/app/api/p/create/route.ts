import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostValidator } from '@/lib/post'
import { z } from 'zod'

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const { title, content } = PostValidator.parse(body);

        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        await db.post.create({
            data: {
                title,
                content,
                authorId: session.user.id
            }
        });

        return new Response('Created', { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 });
        }

        return new Response("Internal Server Error", { status: 500 });
    }
}
