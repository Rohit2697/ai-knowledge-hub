import { db } from "@/db";
import { decodedToken, errorResponseObject } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || undefined;

  if (!token)
    return NextResponse.json(errorResponseObject("Unauthorized", 401));

  const decodeToken = decodedToken(token);
  if (!decodeToken)
    return NextResponse.json(errorResponseObject("Unauthorized", 401));

  const userArticles = await db.post.findMany({
    where: {
      createdBy: decodeToken.userId,
    },
  });
  return NextResponse.json(
    userArticles.map((article) => {
      return { ...article, tags: JSON.parse(article.tags) };
    })
  );
}
