'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { useGetPermissionByEmail } from '@/lib/actions/permission';

export function LockWhenNotAdmin() {
  const { data: session } = useSession();
  const getPermissionQuery = useGetPermissionByEmail(session?.user?.email || '');
  const router = useRouter();

  useEffect(() => {
    if (getPermissionQuery.isSuccess && getPermissionQuery.data?.role !== Role.ADMIN) {
      router.push('/');
    }
  }, [getPermissionQuery.data, getPermissionQuery.isSuccess]);

  return <></>;
}
