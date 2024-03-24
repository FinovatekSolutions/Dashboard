'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  Group,
  Text,
  Box,
  useMantineTheme,
  Stack,
  Flex,
  Space,
  Select,
  LoadingOverlay,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Role } from '@prisma/client';
import type { Prisma } from '@prisma/client';

import { PermissionCreateInputSchema } from '@prisma/zod';
import { useGetPermissionById, useRemovePermission } from '@/lib/actions/permission';

interface DeletePermissionFormProps {
  setOpened: (opened: boolean) => void;
  permissionId: string;
}

export function DeletePermissionForm({ setOpened, permissionId }: DeletePermissionFormProps) {
  const theme = useMantineTheme();
  const getPermissionByIdQuery = useGetPermissionById(permissionId);
  const [hasLoaded, setHasLoaded] = useState(false);

  const roleOptions = Object.values(Role).map((role) => ({
    value: role,
    label: role.charAt(0) + role.slice(1).toLowerCase(),
  }));

  const form = useForm({
    initialValues: {
      firstName: getPermissionByIdQuery.data?.firstName || '',
      lastName: getPermissionByIdQuery.data?.lastName || '',
      email: getPermissionByIdQuery.data?.email || '',
      role: getPermissionByIdQuery.data?.role || Role.USER,
    },
    validate: zodResolver(PermissionCreateInputSchema),
  });

  useEffect(() => {
    // When the data is loaded, update form values
    if (getPermissionByIdQuery.data && !hasLoaded) {
      form.setValues({
        firstName: getPermissionByIdQuery.data.firstName,
        lastName: getPermissionByIdQuery.data.lastName,
        email: getPermissionByIdQuery.data.email,
        role: getPermissionByIdQuery.data.role,
      });
      setHasLoaded(true);
    }
  }, [getPermissionByIdQuery.data, form, hasLoaded]);

  const deletePermissionMutation = useRemovePermission(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'permission-delete',
        color: 'teal',
        title: 'Permission was deleted',
        message: 'The permission has been deleted successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'permission-delete',
        color: 'red',
        title: 'Failed to delete permission',
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
      id: 'permission-delete',
      loading: true,
      title: 'Deleting permission',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    deletePermissionMutation.mutate(permissionId);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Text c="darkred">
        Are you sure you want to delete the following permission? This action cannot be undone.
      </Text>
      <Space h="lg" />
      <LoadingOverlay
        visible={getPermissionByIdQuery.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <Stack>
        <Select
          readOnly
          label="Role"
          placeholder="Select a role"
          data={roleOptions}
          {...form.getInputProps('role')}
        />
        <Group grow>
          <TextInput
            readOnly
            label="First Name"
            placeholder="John"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            readOnly
            label="Last Name"
            placeholder="Doe"
            {...form.getInputProps('lastName')}
          />
        </Group>

        <TextInput
          readOnly
          label="Email Address"
          placeholder="john.doe@example.com"
          {...form.getInputProps('email')}
        />

        <Flex direction={{ base: 'column', sm: 'row' }} justify="flex-end" gap={10}>
          <Button
            size="md"
            style={{ minWidth: '200px' }}
            variant="outline"
            mt={10}
            onClick={() => {
              setOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button
            size="md"
            style={{ minWidth: '200px' }}
            color={theme.colors.red[9]}
            variant="filled"
            mt={10}
            type="submit"
          >
            Delete Permission
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
