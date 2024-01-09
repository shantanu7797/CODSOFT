import { ExtendedPost } from "@/types/post";
import Image from 'next/image';
import Link from 'next/link';
import { FC } from "react";
import { EditorOutput } from ".";

interface PostProps {
    posts: ExtendedPost[];
}

const PostBox: FC<PostProps> = ({
    posts
}) => {

    return (
        <div className='relative flex flex-col items-center justify-center w-full gap-y-8'>
            {posts?.map((post) => (
                <div key={post.id} className="flex items-center w-full max-w-full p-4 overflow-hidden bg-white border rounded-lg hover:bg-neutral-50 md:rounded-xl hover:border-slate-300 md:px-6 md:py-4 group">
                    <Link href={`/p/${post.id}`} passHref className='flex flex-col items-start w-full'>
                        <div className='flex flex-col items-start w-full gap-y-4'>
                            <div className='flex items-start gap-3'>
                                <Image
                                    src={post?.author?.image}
                                    alt=''
                                    width={1000}
                                    height={1000}
                                    referrerPolicy="no-referrer"
                                    className='object-cover rounded-full w-9 h-9'
                                />
                                <div className='flex flex-col'>
                                    <h4 className='text-sm font-medium text-gray-800 capitalize'>
                                        {post?.author?.name}
                                    </h4>
                                    <p className='text-xs font-medium text-gray-500'>
                                        {post?.author?.email}
                                    </p>
                                </div>
                            </div>
                            <div className='flex flex-col items-start'>
                                <h2 className='text-lg font-semibold truncate font-heading md:text-2xl md:font-bold text-slate-900'>
                                    {post?.title.substring(0, 48)}...
                                </h2>

                                <div className='relative w-full max-w-xl truncate max-h-32'>
                                    <EditorOutput content={post?.content} />
                                    <div className='absolute bottom-0 left-0 w-full h-24 text-base group-hover:from-neutral-50 bg-gradient-to-t from-white to-transparent'></div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default PostBox;