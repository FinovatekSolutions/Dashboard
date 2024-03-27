'use client';

import type { ReactElement } from 'react';
import { Title, Text, Paper, Center, useMantineTheme } from '@mantine/core';

import { Welcome } from '@/components/examples/Welcome/Welcome';

export function AdminClient(): ReactElement {
  const theme = useMantineTheme();

  return (
    <>
      <Title ta="center" mt={100}>
        <Center>
          <Paper
            w="fit-content"
            p="1rem"
            style={{
              backgroundColor: theme.colors.dark[7],
            }}
          >
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: theme.colors['trust-md-light-blue'][4], to: theme.colors['trust-md-light-green'][7] }}
            >
              Admin Dashboard
            </Text>
          </Paper>
        </Center>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This dashboard allows you to edit and manage your website content.
      </Text>
    </>
  );
}
