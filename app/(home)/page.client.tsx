'use client';

import type { ReactElement } from 'react';
import {
  Paper,
  Title,
  Text,
  Space,
  Center,
  Flex,
  Box,
  useMantineTheme,
  Divider,
  Button,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import CreateClientButton from '@/components/CreateClientButton/CreateClientButton';
import { BankStatementsDragAndDrop } from '@/components/BankStatementsDragAndDrop/BankStatementsDragAndDrop';
import { BankStatementsList } from '@/components/BankStatementsList/BankStatementsList';
import CreateBankButton from '@/components/CreateBankTypeButton/CreateBankTypeButton';
import { FinancialAnalysisButton } from '@/components/FinancialAnalysisButton/FinancialAnalysisButton';
import { SaveFinancialAnalysisButton } from '@/components/SaveFinancialAnalysisButton/SaveFinancialAnalysisButton';
import { SelectBankTypeDropdown } from '@/components/SelectBankTypeDropdown/SelectBankTypeDropdown';
import { SelectClientDropdown } from '@/components/SelectClientDropdown/SelectClientDropdown';
import { TransactionsTable } from '@/components/TransactionsTable/TransactionsTable';

export function MainPage(): ReactElement {
  const theme = useMantineTheme();

  return (
    <Center>
      <Space h="md" />
      <Paper p="xs" shadow="xs" w={{ base: '97%' }} maw={`${theme.breakpoints.lg}`}>
        <Title m={10} order={1}>
          Home
        </Title>
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          justify="space-between"
          style={{ gap: '16px' }} // Adjust the gap size as needed
          mt={16}
        >
          {/* Component 1 */}
          <Paper style={{ flex: 1, height: '400px', backgroundColor: 'cyan' }} p="md">
            <SelectClientDropdown></SelectClientDropdown>
            <CreateClientButton></CreateClientButton>
            <SelectBankTypeDropdown></SelectBankTypeDropdown>
            <CreateBankButton></CreateBankButton>
            <BankStatementsDragAndDrop></BankStatementsDragAndDrop>
          </Paper>

          <Divider size="sm" orientation="vertical" color="#1A1C27"/>

          {/* Component 2 */}
          <Paper style={{ flex: 1, height: '400px', backgroundColor: 'magenta' }} p="md">
            Component 2
          </Paper>

        </Flex>
      </Paper>
    </Center>
  );
}

  {/* <Paper h={50} p="sm" style={{ backgroundColor: 'red' }}>
    Component 0
  </Paper> */}
  {/* Container for the first two components */}

  {/* Component 3 - Always below the first two */}
  {' '}
  {/* Adjust the margin as needed */}
  {/* <Paper style={{ height: '100px', backgroundColor: 'yellow' }} p="md">
    Component 3
  </Paper> */}

  
