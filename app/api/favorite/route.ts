import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import _ from 'lodash';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { movieId } = await request.json();
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json('Unauthenticated!!!', { status: 500 });
    }

    const existingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    if (!existingMovie) {
      return NextResponse.json('Invalid movie ID!', { status: 500 });
    }

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { movieId } = await request.json();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json('Unauthenticated!!!', { status: 500 });
    }

    const existingMovie = await prisma.movie.findUnique({
      where: { id: movieId },
    });
    if (!existingMovie) {
      return NextResponse.json('Invalid movie ID!', { status: 500 });
    }

    const updatedFavoriteIds = _.without(session.user.favoriteIds, movieId);

    const updateUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
