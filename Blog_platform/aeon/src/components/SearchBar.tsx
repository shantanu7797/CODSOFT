"use client";

import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import { Post, Prisma } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CommandEmpty } from 'cmdk';
import debounce from 'lodash.debounce';
import { File } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Command, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/Command';

const SearchBar = () => {

    const router = useRouter();

    const pathname = usePathname();

    const commandRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState<string>("");

    const {
        data: queryResults,
        refetch,
        isFetched,
        isFetching
    } = useQuery({
        queryFn: async () => {
            if (!input) return [];

            const { data } = await axios.get(`/api/search?q=${input}`);
            return data as (Post & {
                _count: Prisma.PostCountAggregateOutputType;
            })[];
        },
        queryKey: ['search-query'],
        enabled: false
    });

    const request = debounce(async () => {
        refetch();
    }, 500);


    const debounceRequest = useCallback(() => {
        request();
    }, [request]);

    useOnClickOutside(commandRef, () => {
        setInput("");
    });

    useEffect(() => {
        setInput("");
    }, [pathname]);


    return (
        <Command
            ref={commandRef}
            className='relative z-50 hidden max-w-lg overflow-visible border rounded-lg md:inline-block'>
            <CommandInput
                isLoading={isFetching}
                onValueChange={(text) => {
                    setInput(text)
                    debounceRequest()
                }}
                value={input}
                className='border-none outline-none focus:border-none focus:outline-none ring-0'
                placeholder='Search blogs...'
            />

            {input.length > 0 && (
                <CommandList className='absolute inset-x-0 bg-white shadow top-full rounded-b-md'>
                    {isFetched && <CommandEmpty className='flex justify-center w-full p-4 text-sm text-zinc-700'>
                        No results found.
                    </CommandEmpty>}
                    {(queryResults?.length ?? 0) > 0 ? (
                        <CommandGroup heading='Blogs'>
                            {queryResults?.map((post: Post) => (
                                <CommandItem
                                    onSelect={() => {
                                        router.push(`/p/${post.id}`)
                                        router.refresh()
                                    }}
                                    key={post.id}
                                    value={post.title}>
                                    <File className='w-4 h-4 mr-2' />
                                    <a href={`/p/${post.title}`}>{post.title}</a>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    ) : null}
                </CommandList>
            )}
        </Command>
    )
}

export default SearchBar
