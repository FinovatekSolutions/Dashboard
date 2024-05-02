import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Transaction } from '@prisma/client';

import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  removeTransaction,
} from '@/lib/actions/transaction';
import { onSuccessCallback, onErrorCallback, TransactionWithCategory } from '@/lib/utils/types';

export const getAllTransactionsQueryKey = 'getAllTransactions';
export const getTransactionByIdQueryKey = 'getTransactionById';

// Queries:
export function useGetAllTransactions(): UseQueryResult<TransactionWithCategory[]> {
  return useQuery<TransactionWithCategory[]>({
    queryKey: [getAllTransactionsQueryKey],
    queryFn: () => getAllTransactions(),
  } satisfies UseQueryOptions<TransactionWithCategory[]>);
}

export function useGetTransactionById(id: string): UseQueryResult<Transaction | null> {
  return useQuery<Transaction | null>({
    queryKey: [getTransactionByIdQueryKey, id],
    queryFn: () => getTransactionById(id),
    enabled: !!id,
  } satisfies UseQueryOptions<Transaction | null>);
}

// Mutations:
export function useCreateTransaction(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.TransactionCreateInput) => createTransaction(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getAllTransactionsQueryKey] });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.TransactionUpdateInput) => updateTransaction(input),
    onMutate: async (updatedTransaction) => {
      await queryClient.cancelQueries({ queryKey: [getAllTransactionsQueryKey] });
      await queryClient.cancelQueries({
        queryKey: [getTransactionByIdQueryKey, updatedTransaction.id],
      });

      const previousTransactionById = queryClient.getQueryData<Transaction | null>([
        getTransactionByIdQueryKey,
        updatedTransaction.id,
      ]);
      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        getAllTransactionsQueryKey,
      ]);

      if (previousTransactionById) {
        queryClient.setQueryData([getTransactionByIdQueryKey, updatedTransaction.id], {
          ...previousTransactionById,
          ...updatedTransaction,
        });
      }

      if (previousTransactions) {
        const updatedTransactions = previousTransactions.map((transaction) =>
          transaction.id === updatedTransaction.id
            ? { ...transaction, ...updatedTransaction }
            : transaction
        );
        queryClient.setQueryData([getAllTransactionsQueryKey], updatedTransactions);
      }

      return { previousTransactionById, previousTransactions };
    },
    onError: (error, updatedTransaction, context) => {
      if (context?.previousTransactionById) {
        queryClient.setQueryData(
          [getTransactionByIdQueryKey, updatedTransaction.id],
          context.previousTransactionById
        );
      }
      if (context?.previousTransactions) {
        queryClient.setQueryData([getAllTransactionsQueryKey], context.previousTransactions);
      }
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getAllTransactionsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getTransactionByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveTransaction(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeTransaction(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getAllTransactionsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getTransactionByIdQueryKey, data.id] });
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
