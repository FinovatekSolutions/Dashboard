'use client';

import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export function LockWhenSignedOut() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // If the session is not available and status is "unauthenticated", redirect to login
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [session, status]);

  return <></>;
}
