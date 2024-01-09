"use client";

import { toast } from '@/hooks/use-toast';
import { UserRequest, UserValidator } from '@/lib/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from "react";
import { useForm } from 'react-hook-form';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

interface UserFormProps {
    user: Pick<User, 'id' | 'bio'>;
}

const UserForm: FC<UserFormProps> = ({
    user
}) => {

    const router = useRouter();

    const form = useForm<UserRequest>({
        resolver: zodResolver(UserValidator),
        defaultValues: {
            bio: user?.bio || '',
        }
    });

    const { mutate: updateBio, isLoading } = useMutation({
        mutationFn: async ({ bio }: UserRequest) => {
            const payload: UserRequest = {
                bio
            }

            const { data } = await axios.patch('/api/bio', payload);
            return data;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 409) {
                    return toast({
                        title: 'Please make some changes',
                        description: 'You need to make some changes before you can save.',
                        variant: 'destructive'
                    })
                }
            }

            toast({
                title: 'An error occurred',
                description: 'Could not change bio.',
                variant: 'destructive'
            })
        },
        onSuccess: () => {
            toast({
                description: 'Your bio has been updated.',
            });
            router.refresh();
        }
    });

    return (
        <div className='flex flex-col items-start w-full mt-5 space-y-4'>
            <form
                onSubmit={form.handleSubmit((e: any) => updateBio(e))}
                className='w-full space-y-5'
            >
                <div className='flex flex-col items-start md:flex-row'>
                    <div className='w-full max-w-md md:grid'>
                        <Label className='mb-2' htmlFor='bio'>
                            Bio
                        </Label>
                        <Input
                            {...form.register('bio')}
                            placeholder='Enter your bio...'
                            className='w-full'
                            disabled={isLoading}
                        />
                        {form.formState.errors?.bio && (
                            <p className='text-sm text-red-500'>
                                {form.formState.errors.bio.message}
                            </p>
                        )}
                    </div>
                </div>
                <Button
                    isLoading={isLoading}
                    className='ml-auto'
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </form>
        </div>
    );
}

export default UserForm;