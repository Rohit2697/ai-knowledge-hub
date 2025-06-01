import { db } from "@/db";
import { generateToken } from "@/lib/utils";
import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!name || !email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email: email.trim().toLowerCase(),
      name,
      password: hashedPassword,
    },
  });
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
    message: "User created",
    userId: user.id,
    status: 201,
  });
}
