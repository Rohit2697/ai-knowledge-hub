import { db } from '@/db';
import { errorResponseObject } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("post")
  const post = await db.post.findUnique({
    where: { id: params.id },
  });
  console.log("post",post);
  if (!post)
    return NextResponse.json(errorResponseObject('No Article Found', 404));

  return NextResponse.json({
    article: { ...post, coverImage: Array.from(post.coverImage) },
  });
}
