'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';

// we are here because we want to use dynamic imports in the client side
const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
    ssr: false
});

interface EditorOutputProps {
    content: any;
}

const style = {
    paragraph: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'justify'
    },
    ol: {
        textAlign: 'justify',
        marginTop: '16px',
        marginBottom: '16px'
    },
    li: {
        textAlign: 'justify',
        marginTop: '16px',
        marginBottom: '16px'
    }
};

const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
}

const EditorOutput: FC<EditorOutputProps> = ({
    content
}) => {
    return (
        <Output
            data={content}
            style={style}
            renderers={renderers}
            className='h-full my-2 text-sm !text-justify'
        />
    )
}

function CustomImageRenderer({ data }: any) {
    return (
        <div className='relative w-full min-h-[15rem] my-2'>
            <Image
                src={data.file.url}
                alt={data.caption}
                fill
                className='object-cover w-full'
            />
        </div>
    )
}

function CustomCodeRenderer({ data }: any) {
    return (
        <pre className='p-4 my-2 bg-gray-800 rounded-md'>
            <code className='text-sm text-gray-100'>
                {data.code}
            </code>
        </pre>
    )
}

export default EditorOutput
