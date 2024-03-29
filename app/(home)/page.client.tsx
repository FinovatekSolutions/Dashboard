'use client';

import type { ReactElement } from 'react';
import {
  Paper,
  Title,
  Text,
  Space,
  Center,
  Flex,
  rem,
  useMantineTheme,
  Divider,
  Button,
  Container,
  Group,
} from '@mantine/core';
import CreateClientButton from '@/components/client/crud/CreateClientButton/CreateClientButton';
import { BankStatementsDragAndDrop } from '@/components/review/crud/BankStatementsDragAndDrop/BankStatementsDragAndDrop';
import CreateBankTypeButton from '@/components/banktype/crud/CreateBankTypeButton/CreateBankTypeButton';
import { FinancialAnalysisButton } from '@/components/review/general/FinancialAnalysisButton/FinancialAnalysisButton';
import { SaveFinancialAnalysisButton } from '@/components/review/crud/SaveFinancialAnalysisButton/SaveFinancialAnalysisButton';
import { SelectBankTypeDropdown } from '@/components/review/crud/SelectBankTypeDropdown/SelectBankTypeDropdown';
import { SelectClientDropdown } from '@/components/review/crud/SelectClientDropdown/SelectClientDropdown';
import { TransactionsTable } from '@/components/transaction/general/TransactionsTable/TransactionsTable';

export function MainPage(): ReactElement {
  const theme = useMantineTheme();

  return (
    <Center>
      <Space h="md" />
      <Paper mb="sm" p="xs" shadow="xl" withBorder w={{ base: '97%' }} maw={`${theme.breakpoints.lg}`}>
        <Title m={1} order={1}>
          Home
        </Title>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          style={{ gap: '16px' }} // Adjust the gap size as needed
        >
          {/* Component 1 */}
          <Paper
            style={{ flex: 1, height: rem(610), backgroundColor: 'white' }}
            shadow="xs"
            withBorder
            mb="sm"
            p="md"
          >
            {/*Client*/}
            <Text fw={700}>Select Client</Text>
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              mb={5}
              justify="space-between"
              style={{ gap: '16px' }}
            >
              <SelectClientDropdown />
              <CreateClientButton />
            </Flex>

            {/*Bank Statements*/}
            <Text ta="center" fw={700}>
              Bank Statements
            </Text>
            <Flex direction={{ base: 'column', sm: 'row' }} mb={10}>
              <BankStatementsDragAndDrop />
            </Flex>

            {/*Bank Type*/}
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              justify="space-between"
              align="flex-end"
              mb={5}
              style={{ gap: '16px' }}
            >
              <CreateBankTypeButton />
              <Button size="md" radius="xl">
                Submit Bank Statements
              </Button>{' '}
              {/*Leaving in for now as filler*/}
            </Flex>
          </Paper>

          {/*Divider*/}
          <Divider size="sm" orientation="vertical" color="black" />

          {/* Component 2 */}
          <Paper
            style={{ flex: 1, height: rem(610), backgroundColor: 'white' }}
            shadow="xs"
            withBorder
            mb="sm"
            p="md"
          >
            <Text ta="center" fw={700}>
              Categorization
            </Text>

            <Flex
              direction={{ base: 'column', sm: 'row' }}
              justify="flex-end"
              align="flex-end"
              mb={5}
              style={{ gap: '16px' }}
            >
              <Button size="md" radius="xl">
                Save Categorization
              </Button>{' '}
              {/*Leaving in for now as filler*/}
            </Flex>
          </Paper>
        </Flex>
      </Paper>
    </Center>
  );
}
