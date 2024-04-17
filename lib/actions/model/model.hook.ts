import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Model } from '@prisma/client';

import {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  removeModel,
} from '@/lib/actions/model';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';

export const getAllModelsQueryKey = 'getAllModels';
export const getModelByIdQueryKey = 'getModelById';

// Queries:
export function useGetAllModels(): UseQueryResult<Model[]> {
  return useQuery<Model[]>({
    queryKey: [getAllModelsQueryKey],
    queryFn: () => getAllModels(),
  } satisfies UseQueryOptions<Model[]>);
}

export function useGetModelById(id: string): UseQueryResult<Model | null> {
  return useQuery<Model | null>({
    queryKey: [getModelByIdQueryKey, id],
    queryFn: () => getModelById(id),
    enabled: !!id,
  } satisfies UseQueryOptions<Model | null>);
}

// Mutations:
export function useCreateModel(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.ModelCreateInput) => createModel(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getAllModelsQueryKey] });
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

export function useUpdateModel(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.ModelUpdateInput) => updateModel(input),
    onMutate: async (updatedModel) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getAllModelsQueryKey] });
      await queryClient.cancelQueries({ queryKey: [getModelByIdQueryKey, updatedModel.id] });

      // Snapshot the previous values
      const previousModelById = queryClient.getQueryData<Model | null>([
        getModelByIdQueryKey,
        updatedModel.id,
      ]);
      const previousModels = queryClient.getQueryData<Model[]>([getAllModelsQueryKey]);

      // Optimistically update the individual model
      if (previousModelById) {
        queryClient.setQueryData([getModelByIdQueryKey, updatedModel.id], {
          ...previousModelById,
          ...updatedModel,
          // If there are nested objects you need to merge them individually
          // For example, if 'user' is a nested object and you only want to update 'user.name', you'd do:
          // user: { ...previousModelById.user, ...updatedModel.user },
        });
      }

      // Optimistically update the model in the list of all models
      if (previousModels) {
        const updatedModels = previousModels.map((model: Model) =>
          model.id === updatedModel.id ? { ...model, ...updatedModel } : model
        );
        queryClient.setQueryData([getAllModelsQueryKey], updatedModels);
      }

      return { previousModelById, previousModels };
    },
    onError: (error, updatedModel, context) => {
      // Rollback on error
      if (context?.previousModelById) {
        queryClient.setQueryData(
          [getModelByIdQueryKey, updatedModel.id],
          context.previousModelById
        );
      }
      if (context?.previousModels) {
        queryClient.setQueryData([getAllModelsQueryKey], context.previousModels);
      }
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      // Invalidate both queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: [getAllModelsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getModelByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveModel(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => removeModel(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getAllModelsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getModelByIdQueryKey, data.id] });
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
