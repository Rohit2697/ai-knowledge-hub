import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
//import { CreateArticleRequest } from '@/app/articles/article-type';
import { decodeToken, errorResponseObject, readTime } from "@/lib/utils";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET() {
  const posts = await db.post.findMany();
  const sendPosts = posts.map((post) => {
    return { ...post, tags: JSON.parse(post.tags) };
  });
  return NextResponse.json(sendPosts);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const content = formData.get("content") as string;
  const tags = formData.get("tags") as string;
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string;
  const token = req.cookies.get("token")?.value as string | undefined;
  console.log(token);
  if (!token) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  const { email } = decodeToken(token) as { email: string; name: string };
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  if (!file)
    return NextResponse.json(errorResponseObject("No file uploaded", 400));
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const resizeImage = await sharp(buffer).resize(800, 400).jpeg().toBuffer();
  const post = await db.post.create({
    data: {
      title,
      content,
      description,
      tags: JSON.stringify(tags.split(",")),
      slug,
      author: user.name,
      date: `${Date.now()}`,
      readingTime: readTime(content),
      coverImage: resizeImage,
      createdBy: user.id,
    },
  });
  return NextResponse.json({ message: "Post Saved", post });
}
