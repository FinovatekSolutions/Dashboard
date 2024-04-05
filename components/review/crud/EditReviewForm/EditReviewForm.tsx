'use client';

import { Button, TextInput, Box, useMantineTheme, Stack, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { IconCheck, IconX } from '@tabler/icons-react';
import type { Prisma } from '@prisma/client';

import { ReviewUpdateInputSchema } from '@prisma/zod';
import { useGetReviewById, useUpdateReview } from '@/lib/actions/review';

interface EditReviewFormProps {
  setOpened: (opened: boolean) => void;
  reviewId: string;
}

export function EditReviewForm({ setOpened, reviewId }: EditReviewFormProps) {
  const theme = useMantineTheme();
  const getReviewByIdQuery = useGetReviewById(reviewId);

  const form = useForm({
    initialValues: {
      name: getReviewByIdQuery.data?.name || '',
    },
    validate: zodResolver(ReviewUpdateInputSchema),
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

  const handleSubmit = async (values: Prisma.ReviewUpdateInput) => {
    // Show loading notification
    notifications.show({
      id: 'review-update',
      loading: true,
      title: 'Updating review',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    updateReviewMutation.mutate({
      input: {
        id: reviewId,
        ...values,
      },
      clientId: getReviewByIdQuery.data?.clientId || '',
      userEmail: getReviewByIdQuery.data?.user?.email || '',
    });
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Review Name"
          placeholder="Radiography-1"
          {...form.getInputProps('name')}
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
            Update Client
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
