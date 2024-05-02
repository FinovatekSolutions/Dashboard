'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';

import { TransactionUpdateInputSchema } from '@prisma/zod';
import { useGetAllTransactions, useUpdateTransaction } from '@/lib/actions/transaction';

interface EditTransactionFormProps {
  setOpened: (opened: boolean) => void;
  transactionId: string;
}

export function EditTransactionForm({ setOpened, transactionId }: EditTransactionFormProps) {
  const theme = useMantineTheme();
  const getAllTransactionsQuery = useGetAllTransactions();
  const [hasLoaded, setHasLoaded] = useState(false);

  const form = useForm({
    initialValues: {
      date: new Date(),
      description: '',
      amount: 0,
    },
    validate: zodResolver(TransactionUpdateInputSchema),
  });

  useEffect(() => {
    if (getAllTransactionsQuery.data && getAllTransactionsQuery.isSuccess && !hasLoaded) {
      const foundTransaction = getAllTransactionsQuery.data.find((m) => m.id === transactionId);
      if (foundTransaction) {
        form.setValues({
          date: foundTransaction.date,
          description: foundTransaction.description,
          amount: foundTransaction.amount,
        });
        setHasLoaded(true);
      }
    }
  }, [getAllTransactionsQuery.data, transactionId, form, hasLoaded]);

  useEffect(() => {
    // This useEffect will ensure to reset the dirty state after the form values have been initially set
    if (hasLoaded && form) {
      form.resetDirty();
    }
  }, [hasLoaded]);

  const updateTransactionMutation = useUpdateTransaction(
    () => {
      form.reset(); // This will set the form back to initial values and reset dirty state
      notifications.update({
        id: 'transaction-update',
        color: 'teal',
        title: 'Transaction was updated',
        message: 'The transaction has been updated successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    () => {
      notifications.update({
        id: 'transaction-update',
        color: 'red',
        title: 'Failed to update transaction',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.TransactionUpdateInput) => {
    notifications.show({
      id: 'transaction-update',
      loading: true,
      title: 'Updating transaction',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    updateTransactionMutation.mutate({ id: transactionId, ...values });
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group grow>
          <TextInput label="First Name" placeholder="John" {...form.getInputProps('firstName')} />
          <TextInput label="Last Name" placeholder="Doe" {...form.getInputProps('lastName')} />
        </Group>
        <Flex direction={{ base: 'column', sm: 'row' }} justify="flex-end">
          <Button
            size="md"
            style={{ minWidth: '200px' }}
            variant="filled"
            mt={10}
            type="submit"
            disabled={!form.isDirty()}
          >
            Update Transaction
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
