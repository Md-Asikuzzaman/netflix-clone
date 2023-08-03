import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json('Unauthenticated!!!', { status: 500 });
    }

    const favoriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: session.user.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoriteMovies, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
