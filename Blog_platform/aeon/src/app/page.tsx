import { Feed } from '@/components';

export default async function HomePage() {
    return (
        <main className='h-full pt-20'>
            <section className='w-full h-full'>
                <Feed />
            </section>
        </main>
    )
}
