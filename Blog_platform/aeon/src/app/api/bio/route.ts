import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserRequest, UserValidator } from '@/lib/user'
import { z } from 'zod'

export async function PATCH(req: Request) {
    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const body = await req.json();

        const { bio } = UserValidator.parse(body);

        const data = await db.user.findFirst({
            where: {
                bio: bio,
            }
        });

        if (data) {
            return new Response('Bio already exists', { status: 409 });
        }

        // update the bio
        await db.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                bio: bio,
            },
        });

        return new Response('OK')
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 });
        }

        return new Response('Could not changed bio. Please try later', { status: 500 });
    }
}