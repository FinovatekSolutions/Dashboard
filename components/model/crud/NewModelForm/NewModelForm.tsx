'use client';

import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';

import { ModelCreateInputSchema } from '@prisma/zod';
import { useCreateModel } from '@/lib/actions/model';

interface NewModelFormProps {
  setOpened: (opened: boolean) => void;
}

export function NewModelForm({ setOpened }: NewModelFormProps) {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validate: zodResolver(ModelCreateInputSchema),
  });

  // Function to check if all fields are dirty
  const allFieldsDirty = () => Object.keys(form.values).every((key) => form.isDirty(key));

  const createModelMutation = useCreateModel(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'model-create',
        color: 'teal',
        title: 'Model was created',
        message: 'The new model has been added successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'model-create',
        color: 'red',
        title: 'Failed to create model',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.ModelCreateInput) => {
    // Show loading notification
    notifications.show({
      id: 'model-create',
      loading: true,
      title: 'Creating model',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    createModelMutation.mutate(values);
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
            Add Model
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
