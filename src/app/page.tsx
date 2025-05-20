import ArticleCard from '@/components/ArticleCard';

import { sampleArticles } from '@/db/articles';
export default function Home() {
  return (
    <div>
      <main className="max-w-5xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Latest Articles</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {sampleArticles.map((article, index) => {
            return <ArticleCard key={index} {...article} />;
          })}
        </div>
      </main>
    </div>
  );
}
