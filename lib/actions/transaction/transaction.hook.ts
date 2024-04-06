/* eslint-disable @typescript-eslint/no-unused-vars */
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Transaction } from '@prisma/client';

import {
  getTransactions,
  getTransactionsByReviewId,
  getTransactionById,
  createTransaction,
  updateTransactions,
  updateTransaction,
  removeTransaction,
} from '@/lib/actions/transaction';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';

const getTransactionsQueryKey = 'getTransactions';
const getTransactionByIdQueryKey = 'getTransactionById';

// Queries:
export function useGetTransactions(): UseQueryResult<Transaction[]> {
  return useQuery<Transaction[]>({
    queryKey: [getTransactionsQueryKey],
    queryFn: () => getTransactions(),
  } satisfies UseQueryOptions<Transaction[]>);
}

export function useGetTransactionsByReviewId(reviewId: string): UseQueryResult<Transaction[]> {
  return useQuery<Transaction[]>({
    queryKey: [getTransactionsQueryKey, reviewId],
    queryFn: () => getTransactionsByReviewId(reviewId),
  } satisfies UseQueryOptions<Transaction[]>);
}

export function useGetTransactionById(transactionId: string): UseQueryResult<Transaction | null> {
  return useQuery<Transaction | null>({
    queryKey: [getTransactionByIdQueryKey, transactionId],
    queryFn: () => getTransactionById(transactionId),
    enabled: !!transactionId,
  } satisfies UseQueryOptions<Transaction | null>);
}

// Mutations:
export function useCreateTransaction(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      input,
      reviewId,
    }: {
      input: Prisma.TransactionCreateInput;
      reviewId: string;
    }) => createTransaction(input),
    onSuccess: (data, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: [getTransactionsQueryKey, reviewId] });
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

export function useUpdateTransaction(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  return useMutation({
    mutationFn: async (input: Prisma.TransactionUpdateInput) => updateTransaction(input),

    onError: (error) => {
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useUpdateTransactions(
  onSuccessCb?: onSuccessCallback,
  onErrorCb?: onErrorCallback
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      inputs,
      reviewId,
    }: {
      inputs: Prisma.TransactionUpdateInput[];
      reviewId: string;
    }) => updateTransactions(inputs),
    onMutate: async ({ inputs: updatedTransactions, reviewId }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getTransactionsQueryKey, reviewId] });

      // Snapshot the previous value
      const previousTransactions = queryClient.getQueryData([getTransactionsQueryKey, reviewId]);

      // Optimistically update to the new value
      queryClient.setQueryData([getTransactionsQueryKey, reviewId], (old: Transaction[]) =>
        old.map((transaction) => {
          const updateForThisTransaction = updatedTransactions.find(
            (update) => update.id === transaction.id
          );
          return updateForThisTransaction
            ? { ...transaction, ...updateForThisTransaction }
            : transaction;
        })
      );

      return { previousTransactions };
    },
    onError: (error, { reviewId }, context) => {
      // Rollback on error
      queryClient.setQueryData([getTransactionsQueryKey, reviewId], context?.previousTransactions);

      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getTransactionsQueryKey] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveTransaction(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ transactionId, reviewId }: { transactionId: string; reviewId: string }) =>
      removeTransaction(transactionId),
    onSuccess: (data, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: [getTransactionsQueryKey, reviewId] });
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
