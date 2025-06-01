import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
//import { CreateArticleRequest } from '@/app/articles/article-type';
import { decodedToken, errorResponseObject, readTime } from "@/lib/utils";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false,
  },
};
interface UserArtlcesParams {
  params: Promise<{
    userId: string;
  }>;
}

export async function GET(req: NextRequest, context: UserArtlcesParams) {
  const params = await context.params;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLocaleLowerCase() || "";
  if (search) {
    const searchedArticles = await db.post.findMany({
      where: {
        OR: [
          {
            title: { contains: search },
            description: { contains: search },
            content: { contains: search },
          },
        ],
      },
    });
    return NextResponse.json(
      searchedArticles.map((article) => {
        return { ...article, tags: JSON.parse(article.tags) };
      })
    );
  }
  if (params && params.userId) {
    const userArticles = await db.post.findMany({
      where: {
        createdBy: params.userId,
      },
    });
    if (!userArticles.length)
      return NextResponse.json(errorResponseObject("No Articles found!", 404));
    return NextResponse.json(
      userArticles.map((article) => {
        return { ...article, tags: JSON.parse(article.tags) };
      })
    );
  }
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

  if (!token) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  const tokenPayLoad = decodedToken(token);
  if (!tokenPayLoad)
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  const user = await db.user.findUnique({
    where: {
      id: tokenPayLoad.userId,
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
