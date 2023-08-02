import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json('Unauthenticated!!!', { status: 500 });
  }

  const movies = await prisma.movie.findMany();
  return NextResponse.json(movies, { status: 200 });
}
