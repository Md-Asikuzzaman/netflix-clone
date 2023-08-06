import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { movieId: string } }
) {
  try {
    const { movieId } = params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json('Unauthenticated!!!', { status: 500 });
    }

    if (typeof movieId !== 'string' || !movieId) {
      return NextResponse.json('Invalid ID!', { status: 500 });
    }

    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return NextResponse.json('Invalid ID!', { status: 500 });
    }
    
    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
