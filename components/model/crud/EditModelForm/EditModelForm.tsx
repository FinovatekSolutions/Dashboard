'use client';

import { useState, useEffect } from 'react';
import { Button, TextInput, Group, Box, useMantineTheme, Stack, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Model, Prisma } from '@prisma/client';

import { ModelUpdateInputSchema } from '@prisma/zod';
import { useGetAllModels, useUpdateModel } from '@/lib/actions/model';

interface EditModelFormProps {
  setOpened: (opened: boolean) => void;
  modelId: string;
}

export function EditModelForm({ setOpened, modelId }: EditModelFormProps) {
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
      name: model?.name || '',
    },
    validate: zodResolver(ModelUpdateInputSchema),
  });

  // Update form values when model data is set or changed
  useEffect(() => {
    if (model && !hasLoaded) {
      form.setValues({
        name: model.name,
      });
      setHasLoaded(true);
    }
  }, [model, form, hasLoaded]);

  const updateModelMutation = useUpdateModel(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'model-update',
        color: 'teal',
        title: 'Model was updated',
        message: 'The model has been updated successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'model-update',
        color: 'red',
        title: 'Failed to update model',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.ModelUpdateInput) => {
    // Show loading notification
    notifications.show({
      id: 'model-update',
      loading: true,
      title: 'Updating model',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    updateModelMutation.mutate({ id: modelId, ...values });
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group grow>
          <TextInput label="Name" placeholder="John" {...form.getInputProps('name')} />
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
            Update Model
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
