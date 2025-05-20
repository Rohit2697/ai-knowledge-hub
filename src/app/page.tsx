import ArticleCard from '@/components/ArticleCard';
import { db } from '@/db';
//import { sampleArticles } from '@/db/articles';
export default async function Home() {
  const articles = await db.post.findMany({
    orderBy: {
      date: 'desc',
    },
  });
  if (!articles.length) {
    return <div>No Article</div>;
  }

  return (
    <div>
      <main className="max-w-5xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, index) => {
            return <ArticleCard key={index} {...article} />;
          })}
        </div>
      </main>
    </div>
  );
}
