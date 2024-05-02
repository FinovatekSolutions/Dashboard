'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Transaction } from '@prisma/client';

import { TransactionUpdateInputSchema } from '@prisma/zod';
import { useGetAllTransactions, useRemoveTransaction } from '@/lib/actions/transaction';

interface DeleteTransactionFormProps {
  setOpened: (opened: boolean) => void;
  transactionId: string;
}

export function DeleteTransactionForm({ setOpened, transactionId }: DeleteTransactionFormProps) {
  const theme = useMantineTheme();
  const getAllTransactionsQuery = useGetAllTransactions();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (getAllTransactionsQuery.data && getAllTransactionsQuery.isSuccess) {
      const foundTransaction = getAllTransactionsQuery.data.find((m) => m.id === transactionId);
      setTransaction(foundTransaction ?? null);
    }
  }, [getAllTransactionsQuery.data, getAllTransactionsQuery.isSuccess, transactionId]);

  const form = useForm({
    initialValues: {
      firstName: transaction?.firstName || '',
      lastName: transaction?.lastName || '',
    },
    validate: zodResolver(TransactionUpdateInputSchema),
  });

  // Update form values when transaction data is set or changed
  useEffect(() => {
    if (transaction && !hasLoaded) {
      form.setValues({
        firstName: transaction.firstName,
        lastName: transaction.lastName,
      });
      setHasLoaded(true);
    }
  }, [transaction, form, hasLoaded]);

  const deleteTransactionMutation = useRemoveTransaction(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'transaction-delete',
        color: 'teal',
        title: 'Transaction was deleted',
        message: 'The transaction has been deleted successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'transaction-delete',
        color: 'red',
        title: 'Failed to delete transaction',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async () => {
    // Show loading notification
    notifications.show({
      id: 'transaction-delete',
      loading: true,
      title: 'Deleting transaction',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    deleteTransactionMutation.mutate(transactionId);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Text c="darkred">
          Are you sure you want to delete the following transaction? This action cannot be undone.
        </Text>
        <Group grow>
          <TextInput
            readOnly
            label="First Name"
            placeholder="John"
            pointer
            {...form.getInputProps('firstName')}
          />
          <TextInput
            readOnly
            label="Last Name"
            placeholder="Doe"
            pointer
            {...form.getInputProps('lastName')}
          />
        </Group>
        <Flex direction={{ base: 'column', sm: 'row' }} justify="flex-end">
          <Button
            size="md"
            style={{ minWidth: '200px' }}
            variant="filled"
            color="red"
            mt={10}
            type="submit"
          >
            Delete Transaction
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
