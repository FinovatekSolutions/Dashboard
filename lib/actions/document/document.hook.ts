import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Prisma } from '@prisma/client';

import {
  getDocuments,
  getFullDocumentById,
  createDocument,
  updateDocument,
  removeDocument,
} from '@/lib/actions/document';
import {
  onSuccessCallback,
  onErrorCallback,
  DocumentDetails,
  FullDocument,
} from '@/lib/utils/types';

export const getDocumentsQueryKey = 'getDocuments';
export const getDocumentByIdQueryKey = 'getDocumentById';

// Queries:
export function useGetDocuments(): UseQueryResult<DocumentDetails[]> {
  return useQuery<DocumentDetails[]>({
    queryKey: [getDocumentsQueryKey],
    queryFn: () => getDocuments(),
  } satisfies UseQueryOptions<DocumentDetails[]>);
}

export function useGetFullDocumentById(documentId: string): UseQueryResult<FullDocument | null> {
  return useQuery<FullDocument | null>({
    queryKey: [getDocumentByIdQueryKey, documentId],
    queryFn: () => getFullDocumentById(documentId),
    enabled: !!documentId,
  } satisfies UseQueryOptions<FullDocument | null>);
}

// Mutations:
export function useCreateDocument(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.DocumentCreateInput) => createDocument(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getDocumentsQueryKey] });
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

export function useUpdateDocument(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.DocumentUpdateInput) => updateDocument(input),
    onMutate: async (updatedDocument) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: [getDocumentByIdQueryKey, updatedDocument.id] });

      // Snapshot the previous value
      const previousDocumentById = queryClient.getQueryData([
        getDocumentByIdQueryKey,
        updatedDocument.id,
      ]);

      // If there's existing review data, merge it with the updates
      const mergedDocument = previousDocumentById
        ? {
            ...previousDocumentById,
            ...updatedDocument,
            // If there are nested objects you need to merge them individually
            // For example, if 'user' is a nested object and you only want to update 'user.name', you'd do:
            // user: { ...previousReviewById.user, ...updatedReview.user },
          }
        : updatedDocument; // Fallback to updatedReview directly if no previous data

      // Optimistically update to the new value
      queryClient.setQueryData([getDocumentByIdQueryKey, updatedDocument.id], mergedDocument);

      return { previousDocumentById };
    },
    onError: (error, updatedDocument, context) => {
      // Rollback on error
      queryClient.setQueryData(
        [getDocumentByIdQueryKey, updatedDocument.id],
        context?.previousDocumentById
      );
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getDocumentsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getDocumentByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveDocument(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (documentId: string) => removeDocument(documentId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getDocumentsQueryKey] });
      queryClient.invalidateQueries({ queryKey: [getDocumentByIdQueryKey, data.id] });
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
