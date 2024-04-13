import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Prisma } from '@prisma/client';

import { createEvent, updateEvent, removeEvent } from '@/lib/actions/event';
import { onSuccessCallback, onErrorCallback } from '@/lib/utils/types';
import { getDocumentByIdQueryKey } from '@/lib/actions/document';

// Mutations:
export function useCreateEvent(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      documentId,
      input,
    }: {
      documentId: string;
      input: Prisma.EventCreateInput;
    }) => createEvent(documentId, input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getDocumentByIdQueryKey, data.documentId] });
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

export function useUpdateEvent(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Prisma.EventUpdateInput) => updateEvent(input),
    onError: (error) => {
      if (onErrorCb) {
        onErrorCb(error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [getDocumentByIdQueryKey, data.id] });
      if (onSuccessCb) {
        onSuccessCb(data);
      }
    },
  });
}

export function useRemoveEvent(onSuccessCb?: onSuccessCallback, onErrorCb?: onErrorCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: string) => removeEvent(eventId),
    onSuccess: (data) => {
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
