'use client';

import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';
import { BankTypeCreateInputSchema } from '@prisma/zod';
import { useCreateBankType } from '@/lib/actions/banktype';

interface NewBankTypeFormProps {
  setOpened: (opened: boolean) => void;
}

export function NewBankTypeForm({ setOpened }: NewBankTypeFormProps) {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: zodResolver(BankTypeCreateInputSchema),
  });

  const createBankTypeMutation = useCreateBankType(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'banktype-create',
        color: 'teal',
        title: 'Bank Type was created',
        message: 'The new Bank Type has been added successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'banktype-create',
        color: 'red',
        title: 'Failed to create Bank Type',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.BankTypeCreateInput) => {
    // Show loading notification
    notifications.show({
      id: 'banktype-create',
      loading: true,
      title: 'Creating Bank Type',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    createBankTypeMutation.mutate(values);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group grow>
          <TextInput
            label="Bank Type Name"
            placeholder="Banco Popular"
            {...form.getInputProps('name')}
          />
        </Group>
        <Flex direction={{ base: 'column', sm: 'row' }} justify="flex-end">
          <Button
            size="md"
            style={{ minWidth: '200px' }}
            color={theme.colors['trust-md-light-blue'][4]}
            variant="filled"
            mt={10}
            type="submit"
          >
            Add Bank Type
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
