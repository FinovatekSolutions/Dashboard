import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Client, Review, User } from '@prisma/client';

import {
  getClients,
  getClientById,
  createClient,
  updateClient,
  removeClient,
} from '@/lib/actions/client';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';

const getClientsQueryKey = 'getClients';
const getClientByIdQueryKey = 'getClientById';

// Queries:
export function useGetClients(): UseQueryResult<Client[]> {
  return useQuery<Client[]>({
    queryKey: [getClientsQueryKey],
    queryFn: () => getClients(),
  } satisfies UseQueryOptions<Client[]>);
}

// prettier-ignore
export function useGetClientById(clientId: string): UseQueryResult<
  | (Client & {
      reviews: (Review & {
        user: User;
      })[];
    })
  | null
> {
  return useQuery<(Client & {
    reviews: (Review & {
      user: User;
    })[];
  }) | null>({
    queryKey: [getClientByIdQueryKey, clientId], // Unique query key for each client
    queryFn: () => getClientById(clientId),
    enabled: !!clientId, // Only fetch if clientId is present
  } satisfies UseQueryOptions<(Client & {
    reviews: (Review & {
      user: User;
    })[];
  }) | null>);
}

// Mutations:
export function useCreateClient(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.ClientCreateInput) => createClient(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getClientsQueryKey] });
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

export function useUpdateClient(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.ClientUpdateInput) => updateClient(input),
    onMutate: async (updatedClient) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getClientsQueryKey] });
      await queryClient.cancelQueries({ queryKey: [getClientByIdQueryKey, updatedClient.id] });

      // Snapshot the previous value
      const previousClients = queryClient.getQueryData([getClientsQueryKey]);
      const previousClientById = queryClient.getQueryData([
        getClientByIdQueryKey,
        updatedClient.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData([getClientsQueryKey], (old: Client[]) =>
        old.map((client) =>
          client.id === updatedClient.id ? { ...client, ...updatedClient } : client
        )
      );
      queryClient.setQueryData([getClientByIdQueryKey, updatedClient.id], updatedClient);

      return { previousClients, previousClientById };
    },
    onError: (error, updatedTodo, context) => {
      // Rollback on error
      queryClient.setQueryData([getClientsQueryKey], context?.previousClients);
      queryClient.setQueryData(
        [getClientByIdQueryKey, updatedTodo.id],
        context?.previousClientById
      );
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getClientsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getClientByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveClient(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (clientId: string) => removeClient(clientId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getClientsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getClientByIdQueryKey, data.id] });
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
