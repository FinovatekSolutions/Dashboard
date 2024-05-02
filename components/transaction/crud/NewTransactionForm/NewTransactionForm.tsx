'use client';

import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';

import { TransactionCreateInputSchema } from '@prisma/zod';
import { useCreateTransaction } from '@/lib/actions/transaction';

interface NewTransactionFormProps {
  setOpened: (opened: boolean) => void;
}

export function NewTransactionForm({ setOpened }: NewTransactionFormProps) {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validate: zodResolver(TransactionCreateInputSchema),
  });

  // Function to check if all fields are dirty
  const allFieldsDirty = () => Object.keys(form.values).every((key) => form.isDirty(key));

  const createTransactionMutation = useCreateTransaction(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'transaction-create',
        color: 'teal',
        title: 'Transaction was created',
        message: 'The new transaction has been added successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'transaction-create',
        color: 'red',
        title: 'Failed to create transaction',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.TransactionCreateInput) => {
    // Show loading notification
    notifications.show({
      id: 'transaction-create',
      loading: true,
      title: 'Creating transaction',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    createTransactionMutation.mutate(values);
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
            disabled={!allFieldsDirty()}
          >
            Add Transaction
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
