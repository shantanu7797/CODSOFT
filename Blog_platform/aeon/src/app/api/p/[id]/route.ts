import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {

        const session = await getAuthSession();

        const { id } = params;

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!id) {
            return new NextResponse('Post ID is required', { status: 422 });
        }

        const post = await db.post.delete({
            where: {
                id: id,
            }
        });

        return NextResponse.json(post, { status: 200 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse('Post Id not found', { status: 422 })
        }

        return new NextResponse('Unable to delete the post', { status: 500, })
    }
}