import { prisma } from '@/lib/db';
import { signJwtAccessToken } from '@/lib/jwt';
import { compare } from 'bcrypt';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || !user.hashPassword) {
    throw new Error('Email does not exist!');
  }

  const isCorrectPassword = await compare(password, user.hashPassword);

  if (!isCorrectPassword) {
    throw new Error('Incorrect Password!');
  }

  const { hashPassword, ...userData } = user;

    const accessToken = signJwtAccessToken(userData);

    const result = {
      ...userData,
      accessToken,
    };

  return new Response(JSON.stringify(result));
}
