'use client';
import { Article } from '@/app/articles/article-type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { timestampToDateTimeString } from '@/lib/utils';
import { Spinner } from './ui/spinner';

type ArticleClientProps = {
  id: string;
};

export default function ArticleClient({ id }: ArticleClientProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [imageUrl, setImageURL] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const res = await fetch(`/api/article/${id}`);
      if (!res.ok) {
        return;
      }
      const post: { article: Article } = await res.json();
      setArticle(post.article);
      const byteArray = new Uint8Array(post.article.coverImage); // from number[]
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const urlCreator = window.URL || window.webkitURL;
      const ImageURL = urlCreator.createObjectURL(blob);

      setImageURL(ImageURL);
      setTags(post.article.tags ? JSON.parse(post.article.tags) : []);
    };
    fetchArticle();
    return () => URL.revokeObjectURL(imageUrl);
  }, [id]);

  if (!article)
    return (
      <div className="flex justify-center items-center h-screen text-violet-600 font-semibold text-xl">
        <Spinner size="large" className="text-violet-600" />
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-b from-violet-50 to-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-violet-700 border-b-4 border-violet-300 pb-3">
        {article.title}
      </h1>

      <div className="text-violet-600 text-sm mb-6 font-semibold flex flex-wrap gap-2">
        <span>By {article.author}</span>
        <span>·</span>
        <span>{timestampToDateTimeString(parseInt(article.date))}</span>
        <span>·</span>
        <span>{article.readingTime}</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {article.coverImage && (
        <Image
          src={imageUrl}
          alt={article.slug}
          className="w-full rounded-lg mb-8 shadow-md"
          width={800}
          height={400}
        />
      )}

      <p className="prose prose-lg max-w-none mb-8 text-violet-900 font-medium">{article.description}</p>

      <article className="prose prose-lg max-w-none text-violet-900">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </main>
  );
}
