'use client';

import type { ReactElement } from 'react';
import { Title, Flex, Box, Divider, Button, useMantineTheme } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import { PageContainer } from '@/components/global/PageContainer/PageContainer';

import { CreateTransactionButton } from '@/components/transaction/crud/NewTransactionButton/NewTransactionButton';
import { useGetAllTransactions } from '@/lib/actions/transaction';
import { TransactionsTable } from '@/components/transaction/general/TransactionsTable/TransactionsTable';

export function TransactionsClient(): ReactElement {
  const theme = useMantineTheme();
  const getAllTransactionsQuery = useGetAllTransactions();

  return (
    <PageContainer>
      <Title m={10} order={1} c="white">
        Transactions
      </Title>
      {/* Container for the first two components */}
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        justify="space-between"
        style={{ gap: '16px' }} // Adjust the gap size as needed
        mt={16}
      >
        {/* Component 1 */}
        <CreateTransactionButton />

        {/* Component 2 */}
        <Button
          onClick={() => getAllTransactionsQuery.refetch()}
          leftSection={<IconRefresh size={14} />}
          size="md"
          variant="default"
        >
          Refresh
        </Button>
      </Flex>

      {/* Component 3 - Always below the first two */}
      <Divider my="md" color={theme.colors.dark[3]} />
      <Box style={{ marginTop: '16px' }}>
        {/* Adjust the margin as needed */}
        <TransactionsTable />
      </Box>
    </PageContainer>
  );
}
