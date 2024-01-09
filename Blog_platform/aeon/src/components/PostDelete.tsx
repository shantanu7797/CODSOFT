"use client";

import { toast } from '@/hooks/use-toast';
import { ExtendedPost } from "@/types/post";
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Trash } from 'lucide-react';
import { useRouter } from "next/navigation";
import { FC } from 'react';
import { Button } from './ui/Button';



interface PostDeleteProps {
    post: ExtendedPost;
}

const PostDelete: FC<PostDeleteProps> = ({
    post
}) => {

    const router = useRouter();

    const { mutate: deletePost, isLoading } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.delete(`/api/p/${post.id}`);
            return data;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast({
                        title: 'You cannot delete this post',
                        description: 'You are not the author of this post.',
                        variant: 'destructive'
                    });
                }

                if (error.response?.status == 422) {
                    toast({
                        title: 'Post not found',
                        description: 'This post does not exist.',
                        variant: 'destructive'
                    })
                }
            }

            toast({
                title: 'There was a problem',
                description: 'Something went wrong, please try again.',
                variant: 'destructive'
            })
        },
        onSuccess: () => {
            toast({
                description: 'Your post was deleted.',
            });
            router.refresh();
            router.push("/");
        },
    });


    return (
        <div className='absolute top-24 -right-24'>
            <Button
                variant='destructive'
                onClick={() => deletePost()}
                isLoading={isLoading}
                disabled={isLoading}
            >
                {isLoading ? null : <Trash className='w-4 h-4 mr-2 text-current' />}
                Delete
            </Button>
        </div>
    );
}

export default PostDelete;