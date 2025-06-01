import React, { useEffect, useState } from 'react';
import { PreviewArticleProps } from '@/app/articles/article-type';
import Image from 'next/image';
import { Button } from './ui/button';

const PreviewArticle = ({
    title,
    tags,
    coverImage,
    slug,
    content,
    description,
    setPreview,
}: PreviewArticleProps) => {
    const [previewTags, setPreviewTags] = useState<string[]>([]);

    useEffect(() => {
        if (tags) {
            setPreviewTags(tags.split(',').map(tag => tag.trim()));
        }
    }, [tags]);

    return (
        <main className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-extrabold mb-6 text-violet-700 border-b-4 border-violet-300 pb-3">{title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
                {previewTags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            {coverImage && (
                <Image
                    src={coverImage}
                    alt={slug || 'Cover Image'}
                    className="w-full rounded-lg mb-6 border border-violet-100 shadow"
                    width={800}
                    height={400}
                />
            )}

            {description && <p className="text-lg text-gray-700 mb-6 bg-violet-50 p-4 rounded border-l-4 border-violet-400 shadow-sm">
                {description}
            </p>}

            <article className="prose prose-lg max-w-none text-violet-900">
                <div dangerouslySetInnerHTML={{ __html: content || '' }} />
            </article>

            <div className="text-right">
                <Button
                    onClick={() => setPreview(false)}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded shadow-md transition duration-200"
                    variant="default"
                >
                    Close Preview
                </Button>
            </div>
        </main>
    );
};

export default PreviewArticle;
