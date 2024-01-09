import { UserForm } from '@/components'
import { getAuthSession } from '@/lib/auth'
import React from 'react'

export const metadata = {
    title: 'Settings  - Aeon',
    description: 'Manage account and website settings',
}

export default async function ProfilePage() {

    const session = await getAuthSession();

    return (
        <section className='flex items-center justify-center w-full h-full max-w-5xl pt-20 mx-auto'>
            <div className='flex flex-col items-start w-full px-10 mt-8 gap-y-4'>
                <h2 className='text-lg font-semibold md:text-2xl md:font-bold text-slate-900'>
                    Settings
                </h2>
                {/* @ts-ignore */}
                <UserForm
                    user={{
                        id: session?.user.id!,
                        bio: session?.user.bio! || ''
                    }}
                />
            </div>
        </section>
    )
}