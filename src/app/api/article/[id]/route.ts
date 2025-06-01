import { db } from "@/db";
import { errorResponseObject } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};
interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_req: NextRequest, context: Params) {
  const post = await db.post.findUnique({
    where: { id: (await context.params).id },
  });

  if (!post)
    return NextResponse.json(errorResponseObject("No Article Found", 404));

  return NextResponse.json({
    article: {
      ...post,
      tags: JSON.parse(post.tags),
      coverImage: Array.from(post.coverImage),
    },
  });
}
