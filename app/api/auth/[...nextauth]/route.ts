import NextAuth, { Account, Profile, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/utils/prisma';
import { getPermissionByEmail } from '@/lib/actions/permission';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({
      user,
    }: {
      user: User | any;
      account: Account | null;
      profile?: Profile | undefined;
    }): Promise<boolean> {
      const permission = await getPermissionByEmail(user.email);

      if (!permission) {
        return false;
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
