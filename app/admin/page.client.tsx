'use client';

import type { ReactElement } from 'react';
import { Title, Text } from '@mantine/core';

import { Welcome } from '@/components/Welcome/Welcome';

export function AdminClient(): ReactElement {
  return (
    <>
      <Title ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Admin Dashboard
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This dashboard allows you to edit and manage your website content.
      </Text>
    </>
  );
}
