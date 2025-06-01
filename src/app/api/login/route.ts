import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  console.log(email, password);
  if (!email || !password)
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });

  const user = await db.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }
  const token = generateToken(user.id, user.email, user.name);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      token,
      tokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
  (await cookies()).set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60,
  });
  return NextResponse.json({
    message: "logged in successfully!",
    userId: user.id,
    status: 200,
  });
}
