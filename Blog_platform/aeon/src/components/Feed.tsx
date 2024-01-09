import { db } from '@/lib/db';
import { PostBox } from '.';

const Feed = async () => {

    const blogs = await db.post.findMany({
        include: {
            author: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className='container grid w-full h-full max-w-2xl grid-cols-1 py-10 mx-auto'>
            <PostBox posts={blogs} />
        </div>
    );
};

export default Feed;