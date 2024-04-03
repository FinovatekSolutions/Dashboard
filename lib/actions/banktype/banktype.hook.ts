import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, BankType } from '@prisma/client';

import {
  getBankTypes,
  getBankTypeById,
  createBankType,
  updateBankType,
  removeBankType,
} from '@/lib/actions/banktype';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';

const getBankTypesQueryKey = 'getBankTypes';
const getBankTypeByIdQueryKey = 'getBankTypeById';

// Queries:
export function useGetBankTypes(): UseQueryResult<BankType[]> {
  return useQuery<BankType[]>({
    queryKey: [getBankTypesQueryKey],
    queryFn: () => getBankTypes(),
  } satisfies UseQueryOptions<BankType[]>);
}

export function useGetBankTypesById(bankTypeId: string): UseQueryResult<BankType | null> {
  return useQuery<BankType | null>({
    queryKey: [getBankTypeByIdQueryKey, bankTypeId], // Unique query key for each client
    queryFn: () => getBankTypeById(bankTypeId),
    enabled: !!bankTypeId, // Only fetch if clientId is present
  } satisfies UseQueryOptions<BankType | null>);
}

// Mutations:
export function useCreateBankType(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.BankTypeCreateInput) => createBankType(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getBankTypesQueryKey] });
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

export function useUpdateBankType(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.BankTypeUpdateInput) => updateBankType(input),
    onMutate: async (updatedBankType) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getBankTypesQueryKey] });
      await queryClient.cancelQueries({ queryKey: [getBankTypeByIdQueryKey, updatedBankType.id] });

      // Snapshot the previous value
      const previousBankTypes = queryClient.getQueryData([getBankTypesQueryKey]);
      const previousBankTypeById = queryClient.getQueryData([
        getBankTypeByIdQueryKey,
        updatedBankType.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData([getBankTypesQueryKey], (old: BankType[]) =>
        old.map((bankType) =>
          bankType.id === updatedBankType.id ? { ...bankType, ...updatedBankType } : bankType
        )
      );
      queryClient.setQueryData([getBankTypeByIdQueryKey, updatedBankType.id], updatedBankType);

      return { previousBankTypes, previousBankTypeById };
    },
    onError: (error, updatedTodo, context) => {
      // Rollback on error
      queryClient.setQueryData([getBankTypesQueryKey], context?.previousBankTypes);
      queryClient.setQueryData(
        [getBankTypeByIdQueryKey, updatedTodo.id],
        context?.previousBankTypeById
      );
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getBankTypesQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getBankTypeByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveBankType(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bankTypeId: string) => removeBankType(bankTypeId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getBankTypesQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getBankTypeByIdQueryKey, data.id] });
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
