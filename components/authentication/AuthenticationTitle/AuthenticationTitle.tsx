'use client';

import React, { useState } from 'react';
import { Paper, Text, Container, Center, Space, Alert } from '@mantine/core';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import { IconInfoCircle } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

import { GoogleButton } from '@/components/shared/GoogleButton/GoogleButton';
import classes from './AuthenticationTitle.module.css';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function AuthenticationTitle({ providers }: LoginClientProps) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const router = useRouter();

  const handleSignIn = (providerId: string) => {
    setLoading(true);
    signIn(providerId, { callbackUrl: '/' });
  };

  return (
    <>
      <Container className={classes.container}>
        <Paper
          withBorder
          shadow="xl"
          p={30}
          mt={0}
          radius="md"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <Center>
            <Image src="/irene_logo.png" alt="IReNE Logo" width={200} height={200} />
          </Center>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {provider.id === 'google' && (
                  <Center>
                    <GoogleButton
                      style={{ width: '100%', maxWidth: '300px' }}
                      mt="xl"
                      size="md"
                      variant="outline"
                      color="black"
                      loading={loading}
                      onClick={() => handleSignIn(provider.id)}
                    >
                      Sign in with UPR
                    </GoogleButton>
                  </Center>
                )}
              </div>
            ))}
        </Paper>
        <Space h="md" />
        {error === 'AccessDenied' ? (
          <Alert
            variant="filled"
            color="cyan"
            withCloseButton
            onClose={() => router.push('/login')}
            title="Access Denied"
            icon={<IconInfoCircle />}
          >
            You do not have permission to access this page.
          </Alert>
        ) : error ? (
          <Alert
            variant="filled"
            color="pink"
            withCloseButton
            onClose={() => router.push('/login')}
            title="Oops"
            icon={<IconInfoCircle />}
          >
            An error has occurred, please try again later.
          </Alert>
        ) : null}
      </Container>
    </>
  );
}
