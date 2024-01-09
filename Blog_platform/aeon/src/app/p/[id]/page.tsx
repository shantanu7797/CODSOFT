import React from 'react';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { PostDetails } from '@/components';


export default async function BlogPage({ params }: { params: { id: string }}) {

    const { id } = params;

    const session = await getAuthSession();

    const post = await db.post.findFirst({
        where: {
            id: id,
        },
        include: {
            author: true,
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    return (
        <section className='relative flex flex-col items-center justify-start w-full h-full max-w-4xl pt-20 mx-auto'>
            <PostDetails post={post} session={session} />
        </section>
    )
}
