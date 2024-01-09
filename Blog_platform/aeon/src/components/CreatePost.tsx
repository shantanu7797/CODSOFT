"use client";

import { toast } from '@/hooks/use-toast';
import { PostCreationRequest, PostValidator } from '@/lib/post';
import { uploadFiles } from '@/lib/uploadthing';
import EditorJS from '@editorjs/editorjs';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { useCustomToast } from '@/hooks/use-custom-toast';

const CreatePost = () => {

    const { loginToast } = useCustomToast();

    const ref = useRef<EditorJS>();

    const _titleRef = useRef<HTMLTextAreaElement>();

    const router = useRouter();

    const [isMounted, setIsMounted] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            title: "",
            content: null,
        }
    });

    const { ref: titleRef, ...rest } = register('title');

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default
        const Header = (await import('@editorjs/header')).default
        const Embed = (await import('@editorjs/embed')).default
        const Table = (await import('@editorjs/table')).default
        const List = (await import('@editorjs/list')).default
        const Code = (await import('@editorjs/code')).default
        const LinkTool = (await import('@editorjs/link')).default
        const InlineCode = (await import('@editorjs/inline-code')).default
        const ImageTool = (await import('@editorjs/image')).default

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'Type here to write your post...',
                inlineToolbar: true,
                data: { blocks: [] },
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/link',
                        },
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {
                                    // @ts-ignore
                                    const [res] = await uploadFiles([file], 'imageUploader')

                                    return {
                                        success: 1,
                                        file: {
                                            url: res.fileUrl,
                                        },
                                    }
                                },
                            },
                        },
                    },
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                },
            })
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            await initializeEditor()

            // setTimeout(() => {
            //     _titleRef?.current?.focus()
            // }, 0)
        }

        if (isMounted) {
            init();

            setTimeout(() => {
                _titleRef.current?.focus();
            }, 0);

            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    }, [isMounted, initializeEditor]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(errors).length) {
            for (const [_key, value] of Object.entries(errors)) {
                value
                toast({
                    title: 'Something went wrong.',
                    description: (value as { message: string }).message,
                    variant: 'destructive',
                })
            }
        }
    }, [errors]);

    const { mutate: createPost } = useMutation({
        mutationFn: async ({
            title,
            content,
        }: PostCreationRequest) => {
            const payload: PostCreationRequest = {
                title,
                content,
            };

            const { data } = await axios.post('/api/p/create', payload);
            return data;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    return loginToast()
                }
            }

            toast({
                title: "Something went wrong",
                description: "We couldn't create your post. Please try again later.",
                variant: "destructive"
            });
        },
        onSuccess: () => {
            router.refresh();
            router.push('/');
            return toast({
                description: "Your post was published!"
            });
        }
    });

    const onSubmit = async (data: PostCreationRequest) => {
        const blocks = await ref?.current?.save();

        const payload: PostCreationRequest = {
            title: data.title,
            content: blocks,
        };

        createPost(payload);
    };

    if (!isMounted) {
        return null;
    }


    return (
        <div className='w-full p-4 my-8 border rounded-lg bg-slate-50 border-slate-200'>
            <form
                id="create-post"
                className='w-fit'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='prose prose-stone'>
                    <TextareaAutosize
                        placeholder='Title'
                        {...register('title')}
                        {...rest}
                        ref={(e) => {
                            titleRef(e);
                            // @ts-ignore
                            _titleRef.current = e;
                        }}
                        className='w-full overflow-hidden text-5xl font-bold bg-transparent appearance-none resize-none focus-within:outline-none'
                    />

                    <div id='editor' className='min-h-[500px]' />
                </div>
            </form>
        </div>
    )
}

export default CreatePost