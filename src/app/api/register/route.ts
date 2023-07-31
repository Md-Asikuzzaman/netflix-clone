import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crate a New Post
export async function POST(request: Request) {
  const { email, name, password } = await request.json();

  try {
    if (!email || !name || !password) {
      return NextResponse.json('Fields are required!', { status: 404 });
    }

    const exitingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (exitingUser) {
      return NextResponse.json('User taken!', { status: 422 });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function GET(request: Request) {
  const user = await prisma.user.findMany();
  //   const user = 'asik';

  return NextResponse.json(user, { status: 200 });
}
