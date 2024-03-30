'use client';

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
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';

import { ClientCreateInputSchema, ReviewCreateInputSchema } from '@prisma/zod';
import { useCreateClient, useGetClientById, useUpdateClient } from '@/lib/actions/client';
import { useGetReviewById, useUpdateReview } from '@/lib/actions/review';
import { calculatePeriod, formatDate } from '@/lib/utils/helpers';

interface EditReviewFormProps {
  setOpened: (opened: boolean) => void;
  reviewId: string;
}

export function EditReviewForm({ setOpened, reviewId }: EditReviewFormProps) {
  const theme = useMantineTheme();
  const getReviewByIdQuery = useGetReviewById(reviewId);
  const getClientByIdQuery = useGetClientById(reviewId);

  const form = useForm({
    initialValues: {
      firstName: getClientByIdQuery.data?.firstName || '',
      lastName: getClientByIdQuery.data?.lastName || '',
      company: getClientByIdQuery.data?.company || '',
      email: getClientByIdQuery.data?.email || '',
      phone: getClientByIdQuery.data?.phone || '',
      address: getClientByIdQuery.data?.address || '',
      city: getClientByIdQuery.data?.city || '',
      state: getClientByIdQuery.data?.state || '',
      zip: getClientByIdQuery.data?.zip || '',
      country: getClientByIdQuery.data?.country || '',
    },
    validate: zodResolver(ClientCreateInputSchema),
  });

  const updateReviewMutation = useUpdateReview(
    // onSuccess callback
    () => {
      form.reset();
      notifications.update({
        id: 'review-update',
        color: 'teal',
        title: 'Review was updated',
        message: 'The review has been updated successfully.',
        icon: <IconCheck size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
      setOpened(false);
    },
    // onError callback
    () => {
      notifications.update({
        id: 'review-update',
        color: 'red',
        title: 'Failed to update review',
        message: 'An error occurred. Please try again.',
        icon: <IconX size={theme.fontSizes.md} />,
        loading: false,
        autoClose: 2000,
      });
    }
  );

  const handleSubmit = async (values: Prisma.ClientUpdateInput) => {
    console.log('Submitting form with values:', values);
    // Show loading notification
    notifications.show({
      id: 'review-update',
      loading: true,
      title: 'Updating review',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    updateReviewMutation.mutate({ id: reviewId, ...values });
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group grow>
          <TextInput label="First Name" placeholder="John" {...form.getInputProps('firstName')} />
          <TextInput label="Last Name" placeholder="Doe" {...form.getInputProps('lastName')} />
        </Group>
        <TextInput
          label="Company Name"
          placeholder="Doe Industries"
          {...form.getInputProps('company')}
        />
        <TextInput
          label="Email Address"
          placeholder="john.doe@example.com"
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Phone Number"
          placeholder="787-555-1234"
          {...form.getInputProps('phone')}
        />
        <Flex direction="row" gap="md">
          <TextInput
            label="Address"
            placeholder="1234 Main St"
            style={{ flex: 3 }} // Set address to 75% width
            {...form.getInputProps('address')}
          />
          <TextInput
            label="Country"
            style={{ flex: 2 }} // Set country to 25% width
            placeholder="Country"
            {...form.getInputProps('country')}
          />
        </Flex>
        <Group grow>
          <TextInput label="City" placeholder="Anytown" {...form.getInputProps('city')} />
          <TextInput label="State/Province" placeholder="State" {...form.getInputProps('state')} />
          <TextInput label="ZIP/Postal Code" placeholder="123456" {...form.getInputProps('zip')} />
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
            Update Client
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
