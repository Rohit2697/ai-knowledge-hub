import ArticleClient from '@/components/ArticleClient';

type Params = {
  params: {
    id: string;
  };
};

export default async function ArticlePage({ params }: Params) {
 // i can see this log
  const { id } = await Promise.resolve(params);
  return <ArticleClient id={id} />;
}
