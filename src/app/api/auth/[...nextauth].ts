import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import prisma_db from '@/lib/prismadb';

export default NextAuth({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and Password required!');
        }

        const user = await prisma_db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashPassword) {
          throw new Error('Email does not exist!');
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Incorrect Password!');
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'production',
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXT_JWT_SECRET,
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
