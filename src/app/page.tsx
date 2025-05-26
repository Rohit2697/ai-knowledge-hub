import ArticleCard from '@/components/ArticleCard';
import { db } from '@/db';

export default async function Home() {
  const articles = await db.post.findMany({
    orderBy: {
      date: 'desc',
    },
  });

  if (!articles.length) {
    return (
      <div className="flex justify-center items-center h-screen text-violet-600 text-xl font-semibold">
        No Articles Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <main className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold mb-10 text-violet-700 border-b-4 border-violet-300 pb-2">
          Latest Articles
        </h1>
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </main>
    </div>
  );
}
