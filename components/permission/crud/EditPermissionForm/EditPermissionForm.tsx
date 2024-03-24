'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  Group,
  Title,
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
import { useGetPermissionById, useUpdatePermission } from '@/lib/actions/permission';

interface EditPermissionFormProps {
  setOpened: (opened: boolean) => void;
  permissionId: string;
}

export function EditPermissionForm({ setOpened, permissionId }: EditPermissionFormProps) {
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

  const updatePermissionMutation = useUpdatePermission(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'permission-update',
        color: 'teal',
        title: 'Permission was updated',
        message: 'The permission has been updated successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'permission-update',
        color: 'red',
        title: 'Failed to update permission',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.PermissionUpdateInput) => {
    // Show loading notification
    notifications.show({
      id: 'permission-update',
      loading: true,
      title: 'Updating permission',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    updatePermissionMutation.mutate({ id: permissionId, ...values });
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <LoadingOverlay
        visible={getPermissionByIdQuery.isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
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
            Update Permission
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
