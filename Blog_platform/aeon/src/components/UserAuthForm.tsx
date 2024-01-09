'use client';

import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import React, { FC, useState } from 'react';
import { Icons } from './Icons';
import { Button } from './ui/Button';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string
}


const UserAuthForm: FC<UserAuthFormProps> = ({
    className,
    ...props
}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const signInGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn('google')
        } catch (error) {
            toast({
                title: 'There was a problem.',
                description: 'There was an error signing in with Google.',
                variant: 'destructive',
            })
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={cn('flex justify-center my-2', className)}{...props}>
            <Button
                size='sm'
                className='w-full'
                onClick={signInGoogle}
                isLoading={isLoading}
            >
                {isLoading ? null : <Icons.google className='w-4 h-4 mr-2' />}
                Google
            </Button>
        </div>
    )
}

export default UserAuthForm
