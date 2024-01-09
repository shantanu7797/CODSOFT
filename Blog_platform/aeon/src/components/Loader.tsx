import React from 'react'
import { Icons } from '.'
import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className='relative flex items-center justify-center h-full mx-auto'>
            <div className='relative flex flex-col items-center'>
                <Icons.icon className='absolute inset-x-0 w-6 h-6 top-[13px] left-3 text-slate-500' />
                <Loader2 className='w-12 h-12 text-gray-500 animate-spin' strokeWidth={1} />
            </div>
        </div>
    )
}

export default Loader
