'use client';

import type { ReactElement } from 'react';
import { Center, Divider, Space, Title, useMantineTheme } from '@mantine/core';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';
import { UserProfile } from '@/components/user/general/UserProfile/UserProfile';

export function ProfileClient(): ReactElement {
  const theme = useMantineTheme();

  return (
    <PageContainer maw={`${theme.breakpoints.xs}`}>
      <Title m={10} order={1}>
        Profile
      </Title>
      <Divider my="md" />
      <Space h="md" />
      <Center>
        <UserProfile />
      </Center>
      <Space h="md" />
    </PageContainer>
  );
}
