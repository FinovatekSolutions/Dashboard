import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma, Permission, Review, User } from '@prisma/client';

import {
  getPermissions,
  getPermissionById,
  getPermissionByEmail,
  createPermission,
  updatePermission,
  removePermission,
} from '@/lib/actions/permission';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';

const getPermissionsQueryKey = 'getPermissions';
const getPermissionByIdQueryKey = 'getPermissionById';

// Queries:
export function useGetPermissions(): UseQueryResult<Permission[]> {
  return useQuery<Permission[]>({
    queryKey: [getPermissionsQueryKey],
    queryFn: () => getPermissions(),
  } satisfies UseQueryOptions<Permission[]>);
}

export function useGetPermissionById(permissionId: string): UseQueryResult<Permission | null> {
  return useQuery<Permission | null>({
    queryKey: [getPermissionByIdQueryKey, permissionId], // Unique query key for each client
    queryFn: () => getPermissionById(permissionId),
    enabled: !!permissionId, // Only fetch if clientId is present
  } satisfies UseQueryOptions<Permission | null>);
}

export function useGetPermissionByEmail(email: string): UseQueryResult<Permission | null> {
  return useQuery<Permission | null>({
    queryKey: [getPermissionByIdQueryKey, email], // Unique query key for each client
    queryFn: () => getPermissionByEmail(email),
    enabled: !!email, // Only fetch if email is present
  } satisfies UseQueryOptions<Permission | null>);
}

// Mutations:
export function useCreatePermission(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.PermissionCreateInput) => createPermission(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getPermissionsQueryKey] });
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

export function useUpdatePermission(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.PermissionUpdateInput) => updatePermission(input),
    onMutate: async (updatedPermission) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getPermissionsQueryKey] });
      await queryClient.cancelQueries({
        queryKey: [getPermissionByIdQueryKey, updatedPermission.id],
      });

      // Snapshot the previous value
      const previousPermissions = queryClient.getQueryData([getPermissionsQueryKey]);
      const previousPermissionById = queryClient.getQueryData([
        getPermissionByIdQueryKey,
        updatedPermission.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData([getPermissionsQueryKey], (old: Permission[]) =>
        old.map((permission) =>
          permission.id === updatedPermission.id
            ? { ...permission, ...updatedPermission }
            : permission
        )
      );
      queryClient.setQueryData(
        [getPermissionByIdQueryKey, updatedPermission.id],
        updatedPermission
      );

      return { previousPermissions, previousPermissionById };
    },
    onError: (error, updatedPermission, context) => {
      // Rollback on error
      queryClient.setQueryData([getPermissionsQueryKey], context?.previousPermissions);
      queryClient.setQueryData(
        [getPermissionByIdQueryKey, updatedPermission.id],
        context?.previousPermissionById
      );
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getPermissionsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getPermissionByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemovePermission(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (permissionId: string) => removePermission(permissionId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getPermissionsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getPermissionByIdQueryKey, data.id] });
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
