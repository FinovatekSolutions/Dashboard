/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma } from '@prisma/client';

import {
  getReviews,
  getReviewsByUserEmail,
  getReviewById,
  createReview,
  updateReview,
  removeReview,
} from '@/lib/actions/review';
import {
  onSuccessCallback,
  onErrorCallback,
  ReviewWithUser,
  FullReviewDetails,
} from '@/lib/utils/types';

const getReviewsQueryKey = 'getReviews';
const getReviewByIdQueryKey = 'getReviewById';

// Queries:
export function useGetReviews(): UseQueryResult<ReviewWithUser[]> {
  return useQuery<ReviewWithUser[]>({
    queryKey: [getReviewsQueryKey],
    queryFn: () => getReviews(),
  } satisfies UseQueryOptions<ReviewWithUser[]>);
}

export function useGetReviewsByUserEmail(userEmail: string): UseQueryResult<ReviewWithUser[]> {
  return useQuery<ReviewWithUser[]>({
    queryKey: [getReviewsQueryKey, userEmail],
    queryFn: () => getReviewsByUserEmail(userEmail),
    enabled: !!userEmail,
  } satisfies UseQueryOptions<ReviewWithUser[]>);
}

export function useGetReviewById(reviewId: string): UseQueryResult<FullReviewDetails | null> {
  return useQuery<FullReviewDetails | null>({
    queryKey: [getReviewByIdQueryKey, reviewId],
    queryFn: () => getReviewById(reviewId),
    enabled: !!reviewId,
  } satisfies UseQueryOptions<FullReviewDetails | null>);
}

// Mutations:
export function useCreateReview(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.ReviewCreateInput) => createReview(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getReviewsQueryKey] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
    onError: (error) => {
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
  });
}

export function useUpdateReview(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      input,
      clientId,
      userEmail,
    }: {
      input: Prisma.ReviewUpdateInput;
      clientId: string;
      userEmail: string;
    }) => updateReview(input),
    onMutate: async ({ input: updatedReview, clientId, userEmail }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getReviewByIdQueryKey, updatedReview.id] });

      // Snapshot the previous value
      const previousReviewById = queryClient.getQueryData([
        getReviewByIdQueryKey,
        updatedReview.id,
      ]);

      // If there's existing review data, merge it with the updates
      const mergedReview = previousReviewById
        ? {
            ...previousReviewById,
            ...updatedReview,
            // If there are nested objects you need to merge them individually
            // For example, if 'user' is a nested object and you only want to update 'user.name', you'd do:
            // user: { ...previousReviewById.user, ...updatedReview.user },
          }
        : updatedReview; // Fallback to updatedReview directly if no previous data

      // Optimistically update to the new value
      queryClient.setQueryData([getReviewByIdQueryKey, updatedReview.id], mergedReview);

      return { previousReviewById };
    },
    onError: (error, { input: updatedReview }, context) => {
      // Rollback on error
      queryClient.setQueryData(
        [getReviewByIdQueryKey, updatedReview.id],
        context?.previousReviewById
      );
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data, { clientId, userEmail }) => {
      queryClient.invalidateQueries({ queryKey: [getReviewsQueryKey, clientId] });
      queryClient.invalidateQueries({ queryKey: [getReviewsQueryKey, userEmail] });
      queryClient.invalidateQueries({ queryKey: [getReviewByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveReview(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => removeReview(reviewId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getReviewsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getReviewByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb();
      }
    },
    onError: (error) => {
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
  });
}
