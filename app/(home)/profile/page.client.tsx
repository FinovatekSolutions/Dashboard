'use client';

import type { ReactElement } from 'react';
import { Center, Divider, Paper, Space, Title, useMantineTheme } from '@mantine/core';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';
import { UserProfile } from '@/components/user/general/UserProfile/UserProfile';

export function ProfileClient(): ReactElement {
  const theme = useMantineTheme();

  return (
    <PageContainer maw={`${theme.breakpoints.xs}`}>
      <Title m={10} order={1} c="white">
        Profile
      </Title>
      <Divider my="md" />
      <Space h="md" />
      <Center>
        <Paper py="xl" px="lg" radius="md" withBorder>
          <UserProfile />
        </Paper>
      </Center>
      <Space h="md" />
    </PageContainer>
  );
}
