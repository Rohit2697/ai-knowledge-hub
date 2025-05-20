import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { CreateArticleRequest } from '@/app/articles/article-type';
export async function GET() {
  const posts = await db.post.findMany();
  const sendPosts = posts.map((post) => {
    return { ...post, tags: JSON.parse(post.tags) };
  });
  return NextResponse.json(sendPosts);
}

export async function POST(req: NextRequest) {
  const body: CreateArticleRequest = await req.json();
  const post = await db.post.create({
    data: {
      ...body,
      slug: body.title.toLowerCase().split(' ').join('-'),
      author: 'rohit',
      date: `${Date.now()}`,
      readingTime: '7min',
    },
  });
  return NextResponse.json({ message: 'Post Saved', post });
}
