import React from 'react';
import { ArticleCardProps } from '@/app/articles/article-type';
import Link from 'next/link';

export default function ArticleCard({
  slug,
  title,
  description,
  tags,
  author,
  date,
}: ArticleCardProps) {
  const newTags: string[] = tags ? JSON.parse(tags) : [];
  const newDate = new Date(parseInt(date));

  return (
    <Link href={`/articles/${slug}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <h2 className="text-lg font-semibold mb-1">{title}</h2>
        <p className="text-sm text-gray-600 mb-3">{description}</p>

        <div className="flex gap-2 flex-wrap mb-3">
          {newTags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-sm px-3 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>by {author}</span>
          <span>{`${newDate.getDate().toString().padStart(2, '0')}-${newDate
            .getMonth()
            .toString()
            .padStart(2, '0')}-${newDate.getFullYear().toString()}`}</span>
        </div>
      </div>
    </Link>
  );
}
