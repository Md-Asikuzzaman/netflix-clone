import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

import axios from 'axios';
import { prisma } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email',
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

        const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/login`, {
          email: credentials.email,
          password: credentials.password,
        });

        const user = await res.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }

      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin',
    error: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'production',
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt',
  },
};
