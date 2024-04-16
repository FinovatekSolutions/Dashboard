'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Model } from '@prisma/client';

import { ModelUpdateInputSchema } from '@prisma/zod';
import { useGetAllModels, useRemoveModel } from '@/lib/actions/model';

interface DeleteModelFormProps {
  setOpened: (opened: boolean) => void;
  modelId: string;
}

export function DeleteModelForm({ setOpened, modelId }: DeleteModelFormProps) {
  const theme = useMantineTheme();
  const getAllModelsQuery = useGetAllModels();
  const [model, setModel] = useState<Model | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (getAllModelsQuery.data && getAllModelsQuery.isSuccess) {
      const foundModel = getAllModelsQuery.data.find((m) => m.id === modelId);
      setModel(foundModel ?? null);
    }
  }, [getAllModelsQuery.data, getAllModelsQuery.isSuccess, modelId]);

  const form = useForm({
    initialValues: {
      firstName: model?.firstName || '',
      lastName: model?.lastName || '',
    },
    validate: zodResolver(ModelUpdateInputSchema),
  });

  // Update form values when model data is set or changed
  useEffect(() => {
    if (model && !hasLoaded) {
      form.setValues({
        firstName: model.firstName,
        lastName: model.lastName,
      });
      setHasLoaded(true);
    }
  }, [model, form, hasLoaded]);

  const deleteModelMutation = useRemoveModel(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'model-delete',
        color: 'teal',
        title: 'Model was deleted',
        message: 'The model has been deleted successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'model-delete',
        color: 'red',
        title: 'Failed to delete model',
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
      id: 'model-delete',
      loading: true,
      title: 'Deleting model',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    deleteModelMutation.mutate(modelId);
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Text c="darkred">
          Are you sure you want to delete the following model? This action cannot be undone.
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
            Delete Model
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
