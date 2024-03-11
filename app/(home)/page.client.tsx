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
  Container,
} from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import CreateClientButton from '@/components/CreateClientButton/CreateClientButton';
import { BankStatementsDragAndDrop } from '@/components/BankStatementsDragAndDrop/BankStatementsDragAndDrop';
import CreateBankTypeButton from '@/components/CreateBankTypeButton/CreateBankTypeButton';
import { FinancialAnalysisButton } from '@/components/FinancialAnalysisButton/FinancialAnalysisButton';
import { SaveFinancialAnalysisButton } from '@/components/SaveFinancialAnalysisButton/SaveFinancialAnalysisButton';
import { SelectBankTypeDropdown } from '@/components/SelectBankTypeDropdown/SelectBankTypeDropdown';
import { SelectClientDropdown } from '@/components/SelectClientDropdown/SelectClientDropdown';
import { TransactionsTable } from '@/components/TransactionsTable/TransactionsTable';
import { useForm } from '@mantine/form';

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
          <Paper style={{ flex: 1, height: '470px', backgroundColor: 'white' }} shadow="xs" withBorder={true} p="md">
            <Text fw = {700}>Select Client</Text>
            <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" style={{ gap: '16px' }}>
              <SelectClientDropdown></SelectClientDropdown>
              <CreateClientButton></CreateClientButton>
            </Flex>
            
            <Text fw = {700}>Select Bank Type</Text>
            <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" mb = {10} style={{ gap: '16px'}}>
              <SelectBankTypeDropdown></SelectBankTypeDropdown>
              <CreateBankTypeButton></CreateBankTypeButton>
            </Flex>

            <Text ta = "center" fw = {700}>Bank Statements</Text>

            <BankStatementsDragAndDrop></BankStatementsDragAndDrop>
            {/* <BankStatementsList></BankStatementsList> */}

            <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" mb = {10} style={{ gap: '16px'}}>

            </Flex>

          </Paper>

          <Divider size="sm" orientation="vertical" color="#1A1C27"/>

          {/* Component 2 */}
          <Paper style={{ flex: 1, height: '470px', backgroundColor: 'grey' }} shadow="xs" withBorder={true} p="md">
            Component 2
          </Paper>

        </Flex>
      </Paper>
    </Center>
  );
}
