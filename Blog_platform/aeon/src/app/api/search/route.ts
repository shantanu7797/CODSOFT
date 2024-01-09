import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

    const url = new URL(request.url);

    const q = url.searchParams.get('q');

    if (!q) {
        return new NextResponse('Invalid query', { status: 400 });
    }

    console.log('query', q);

    const results = await db.post.findMany({
        where: {
            title: {
                contains: q,
                mode: 'insensitive',
                // startsWith: q,
            }
        },
        take: 5
    });

    console.log('results', results);

    return NextResponse.json(results, { status: 200 });
}