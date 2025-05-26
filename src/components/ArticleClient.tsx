'use client';
import { notFound } from 'next/navigation';
import { Article } from '@/app/articles/article-type';
import Image from 'next/image';

import React, { useEffect, useState } from 'react';

type ArticleClientProps = {
  id: string;
};

export default function ArticleClient({ id }: ArticleClientProps) {
  console.log('AtriclePage Client'); // i can see this log
  const [article, setArticle] = useState<Article | null>(null);
  const [imageUrl, setImageURL] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    console.log('in UseEffect'); //not this one i can see
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

  if (!article) return <div>Loading...</div>;
  console.log(article);
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 text-sm mb-4">
        By {article.author} · {article.date} · {article.readingTime}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {article.coverImage && (
        <Image
          src={imageUrl}
          alt={article.slug}
          className="w-full rounded-lg mb-6"
          width={800}
          height={400}
        />
      )}

      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </main>
  );
}
