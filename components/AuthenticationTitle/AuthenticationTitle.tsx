'use client';

import {
  useMantineTheme,
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
  Space,
} from '@mantine/core';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import Image from 'next/image';
import { IconPigMoney } from '@tabler/icons-react';
import classes from './AuthenticationTitle.module.css';
import { GoogleButton } from '../GoogleButton/GoogleButton';

interface LoginClientProps {
  providers: Record<string, ClientSafeProvider> | null;
}

export function AuthenticationTitle({ providers }: LoginClientProps) {
  const theme = useMantineTheme(); // Access the theme

  return (
    <>
      <Container w="40%">
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={0}
          radius="md"
          styles={{
            root: {
              backgroundColor: '#E2E2E3', // Use theme color or any valid CSS color
            },
          }}
        >
          <Space h="xl" />
          <Center>
            <Image src="/trustmd-full-logo-dark.png" alt="TrustMD Logo" width={390} height={106} />
          </Center>
          <Space h="xl" />
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                {provider.id === 'google' && (
                  <Center>
                    <GoogleButton
                      w="90%"
                      mt="xl"
                      variant="light"
                      onClick={() => {
                        signIn(provider.id, { callbackUrl: '/' });
                      }}
                    >
                      Sign in with Google
                    </GoogleButton>
                  </Center>
                )}
              </div>
            ))}
          <Space h="xl" />
          <Text c="dimmed" ta="center">
            Finovatek Solutions 2024
          </Text>
        </Paper>
      </Container>
    </>
  );
}
