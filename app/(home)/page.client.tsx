'use client';

import type { ReactElement } from 'react';
import {
  Paper,
  Title,
  Text,
  Space,
  Center,
  Flex,
  useMantineTheme,
  rem,
  Divider,
} from '@mantine/core';
import CreateClientButton from '@/components/client/crud/CreateClientButton/CreateClientButton';
import { BankStatementsDragAndDrop } from '@/components/review/crud/BankStatementsDragAndDrop/BankStatementsDragAndDrop';
import { SelectClientDropdown } from '@/components/review/crud/SelectClientDropdown/SelectClientDropdown';

export function MainPage(): ReactElement {
  const theme = useMantineTheme();

  return (
    <Center>
      <Space h="md" />
      <Paper
        mb="sm"
        p="xs"
        shadow="xl"
        withBorder
        w={{ base: '97%' }}
        maw={`${theme.breakpoints.lg}`}
      >
        <Title m={1} order={1}>
          Home
        </Title>
        <Divider my="sm" />
        <Paper
          style={{ flex: 1, minHeight: '300px', backgroundColor: 'white' }} // Adjust min-height as needed
          shadow="none"
          mb="sm"
          p="md"
        >
          <Flex direction="column" justify="space-between">
            <Text fw={700} size="xl">
              Select Client
            </Text>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              mb={5}
              justify="space-between"
              style={{ gap: '16px' }}
            >
              <SelectClientDropdown />
              <CreateClientButton />
            </Flex>
          </Flex>
          <Flex direction="column" justify="space-between">
            <Text fw={700} ta="center" size="xl" mb={3}>
              Bank Statements
            </Text>
            <BankStatementsDragAndDrop />
          </Flex>
        </Paper>
      </Paper>
    </Center>
  );
}
