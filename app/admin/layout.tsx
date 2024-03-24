import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]/route';

import { LockWhenSignedOut } from '@/lib/providers/lock-when-signed-out';
import { AdminNavBar } from '@/components/global/AdminNavBar/AdminNavBar';
import { LockWhenNotAdmin } from '@/lib/providers/lock-when-not-admin';
import { getPermissionByEmail } from '@/lib/actions/permission';

export default async function AdminLayout({ children }: { children: any }) {
  const session = await getServerSession(authOptions);
  const permission = await getPermissionByEmail(session?.user?.email || '');

  if (!session) {
    redirect('/login');
  }

  if (!permission || permission.role !== Role.ADMIN) {
    redirect('/');
  }

  return (
    <>
      <LockWhenSignedOut />
      <LockWhenNotAdmin />
      <AdminNavBar>{children}</AdminNavBar>
    </>
  );
}
