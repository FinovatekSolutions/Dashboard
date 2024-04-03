import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Permission, Review, User } from '@prisma/client';

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
    mutationFn: async (input: Prisma.ReviewUpdateInput) => updateReview(input),
    onMutate: async (updatedReview) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getReviewsQueryKey] });
      await queryClient.cancelQueries({ queryKey: [getReviewByIdQueryKey, updatedReview.id] });

      // Snapshot the previous value
      const previousReviews = queryClient.getQueryData([getReviewsQueryKey]);
      const previousReviewById = queryClient.getQueryData([
        getReviewByIdQueryKey,
        updatedReview.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData([getReviewsQueryKey], (old: ReviewWithUser[]) =>
        old.map((review) =>
          review.id === updatedReview.id ? { ...review, ...updatedReview } : review
        )
      );
      queryClient.setQueryData([getReviewByIdQueryKey, updatedReview.id], updatedReview);

      return { previousReviews, previousReviewById };
    },
    onError: (error, updatedReview, context) => {
      // Rollback on error
      queryClient.setQueryData([getReviewsQueryKey], context?.previousReviews);
      queryClient.setQueryData(
        [getReviewByIdQueryKey, updatedReview.id],
        context?.previousReviewById
      );
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getReviewsQueryKey] });
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
