// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_BASE_URL 
    )
  );
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });
  return response;
}
