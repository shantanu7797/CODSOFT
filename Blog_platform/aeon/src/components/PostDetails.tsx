import { PostDelete } from '@/components';
import { formatTimeToNow } from '@/lib/utils';
import { ExtendedPost } from "@/types/post";
import { Session } from 'next-auth';
import { FC } from 'react';
import { EditorOutput } from ".";

interface PostDetailsProps {
    post: ExtendedPost;
    session: Session | null;
}

const PostDetails: FC<PostDetailsProps> = ({
    post,
    session
}) => {

    const capitalizeName = (name: string) => {
        return name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const capitalizedAuthorName = post?.author?.name ? capitalizeName(post.author.name) : '';

    return (
        <div className='flex flex-col items-center h-full justify-start container mx-auto py-8'>
            {session?.user.id === post?.authorId && (
                <PostDelete post={post} />
            )}
            <div className='flex flex-col items-start h-full max-w-full'>
                <h1 className='text-xl md:text-3xl font-semibold md:font-bold font-heading text-slate-900'>
                    {post.title}
                </h1>
                <p className='mt-2 text-sm text-gray-500'>
                    Posted by {capitalizedAuthorName}
                    {' '}
                    {formatTimeToNow(new Date(post?.createdAt))}
                </p>
                <div className='relative text-sm md:text-base h-full w-full mt-8 overflow-clip'>
                    <EditorOutput content={post.content} />
                </div>
            </div>
        </div>
    )
};

export default PostDetails;