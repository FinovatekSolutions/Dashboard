'use client';

import { useSession } from 'next-auth/react';
import { useGetPermissionByEmail } from '@/lib/actions/permission';

export function PermissionProvider() {
  const { data: session } = useSession();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getPermissionQuery = useGetPermissionByEmail(session?.user?.email || '');

  return <></>;
}
