import { notFound } from 'next/navigation';
import { sampleArticles } from '@/db/articles';
import Image from 'next/image';

type Params = {
  params: {
    slug: string;
  };
};

export default function ArticlePage({ params }: Params) {
  const article = sampleArticles.find((article) => article.id === params.slug);

  if (!article) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <div className="text-gray-600 text-sm mb-4">
        By {article.author} · {article.date} · {article.readingTime}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {article.tags.map((tag) => (
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
          src={article.coverImage}
          alt={article.title}
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
