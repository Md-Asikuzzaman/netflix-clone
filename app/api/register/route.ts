import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// check session existing...
import { prisma } from '@/lib/db';

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

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashPassword: hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    });

    const { hashPassword, ...result } = user;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

