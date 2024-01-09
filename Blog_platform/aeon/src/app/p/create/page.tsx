import { CreatePost } from '@/components'
import { Button } from '@/components/ui/Button';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CreatePostPage() {
    return (
        <main className='px-4 pt-20 md:px-0'>
            <section className='relative flex items-center w-full max-w-2xl mx-auto '>
                <Link href='/' className='absolute left-0 top-4'>
                    <Button variant='outline' size='sm'>
                        <ChevronLeft className='w-4 h-4 text-current' />
                        Back
                    </Button>
                </Link>
                <div className='flex flex-col items-center justify-center pb-12 mt-8'>
                    <div className='flex mx-auto mb-4 text-center'>
                        <h2 className='text-lg font-semibold text-slate-900 md:text-3xl md:font-bold font-heading'>
                            Create Post
                        </h2>
                    </div>
                    <CreatePost />
                    <div className='flex justify-end w-full'>
                        <Button
                            type="submit"
                            className='w-full'
                            form="create-post"
                        >
                            Publish
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}
