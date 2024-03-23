import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { HeaderMegaMenu } from '@/components/global/HeaderMegaMenu/HeaderMegaMenu';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { LockWhenSignedOut } from '@/lib/providers/lock-when-signed-out';

export default async function HomeLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <LockWhenSignedOut />
      <HeaderMegaMenu />
      {children}
    </>
  );
}
