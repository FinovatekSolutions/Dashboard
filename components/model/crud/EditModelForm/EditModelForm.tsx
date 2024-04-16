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

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
    },
    validate: zodResolver(ModelUpdateInputSchema),
  });

  useEffect(() => {
    if (getAllModelsQuery.data && getAllModelsQuery.isSuccess && !hasLoaded) {
      const foundModel = getAllModelsQuery.data.find((m) => m.id === modelId);
      if (foundModel) {
        form.setValues({ firstName: foundModel.firstName, lastName: foundModel.lastName });
        setHasLoaded(true);
      }
    }
  }, [getAllModelsQuery.data, modelId, form, hasLoaded]);

  useEffect(() => {
    // This useEffect will ensure to reset the dirty state after the form values have been initially set
    if (hasLoaded && form) {
      form.resetDirty();
    }
  }, [hasLoaded]);

  const updateModelMutation = useUpdateModel(
    () => {
      form.reset(); // This will set the form back to initial values and reset dirty state
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
            Update Model
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
