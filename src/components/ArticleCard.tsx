import React from 'react';
import { ArticleCardProps } from '@/app/articles/article-type';
import Link from 'next/link';
import { timestampToDateTimeString } from '@/lib/utils';

export default function ArticleCard({
  id,
  title,
  description,
  tags,
  author,
  date,
}: ArticleCardProps) {
  const newTags: string[] = tags ? JSON.parse(tags) : [];
  return (
    <Link href={`/articles/${id}`}>
      <div className="border border-violet-300 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white hover:bg-violet-50">
        <h2 className="text-xl font-bold text-violet-700 mb-2 hover:text-violet-900 transition-colors duration-200">
          {title}
        </h2>
        <p className="text-gray-700 mb-4">
          {description.slice(0, 200)}
          <span className="font-semibold text-violet-600 ml-1">...Read More</span>
        </p>

        <div className="flex gap-2 flex-wrap mb-4">
          {newTags.map((tag, index) => (
            <span
              key={index}
              className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-sm text-violet-500 font-medium">
          <span>by {author}</span>
          <span>{timestampToDateTimeString(parseInt(date))}</span>
        </div>
      </div>
    </Link>
  );
}
