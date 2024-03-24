'use client';

import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Role } from '@prisma/client';
import type { Prisma } from '@prisma/client';

import { PermissionCreateInputSchema } from '@prisma/zod';
import { useCreatePermission } from '@/lib/actions/permission';

interface NewPermissionFormProps {
  setOpened: (opened: boolean) => void;
}

export function NewPermissionForm({ setOpened }: NewPermissionFormProps) {
  const theme = useMantineTheme();

  const roleOptions = Object.values(Role).map((role) => ({
    value: role,
    label: role.charAt(0) + role.slice(1).toLowerCase(),
  }));

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: Role.USER,
    },
    validate: zodResolver(PermissionCreateInputSchema),
  });

  const createPermissionMutation = useCreatePermission(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'permission-create',
        color: 'teal',
        title: 'Permission was created',
        message: 'The new permission has been added successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'permission-create',
        color: 'red',
        title: 'Failed to create permission',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.PermissionCreateInput) => {
    // Show loading notification
    notifications.show({
      id: 'permission-create',
      loading: true,
      title: 'Creating permission',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    createPermissionMutation.mutate(values);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Select
          label="Role"
          placeholder="Select a role"
          data={roleOptions}
          {...form.getInputProps('role')}
        />
        <Group grow>
          <TextInput label="First Name" placeholder="John" {...form.getInputProps('firstName')} />
          <TextInput label="Last Name" placeholder="Doe" {...form.getInputProps('lastName')} />
        </Group>

        <TextInput
          label="Email Address"
          placeholder="john.doe@example.com"
          {...form.getInputProps('email')}
        />

        <Flex direction={{ base: 'column', sm: 'row' }} justify="flex-end">
          <Button
            size="md"
            style={{ minWidth: '200px' }}
            color={theme.colors['trust-md-light-blue'][4]}
            variant="filled"
            mt={10}
            type="submit"
          >
            Add Permission
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
