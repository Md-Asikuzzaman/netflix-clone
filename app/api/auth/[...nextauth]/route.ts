import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import { compare } from 'bcrypt';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
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

        const user = await prisma.user.findUnique({
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
    signIn: '/auth/signin',
    signOut: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'production',
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
