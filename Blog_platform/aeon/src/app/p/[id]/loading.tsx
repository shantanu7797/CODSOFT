import { Loader } from '@/components'
import React from 'react'

const Loading = () => {
    return (
        <div className='fixed inset-0 flex items-center justify-center h-screen bg-white z-[100]'>
            <Loader />
        </div>
    )
}

export default Loading
