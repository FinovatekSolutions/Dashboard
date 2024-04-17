import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { pingHuggingFace } from '@/lib/actions/huggingface/huggingface.action';

const pingHuggingFaceQueryKey = 'pingHuggingFaceApi';

// Queries:
export function pingHuggingFaceQuery() {
  return {
    queryKey: [pingHuggingFaceQueryKey],
    queryFn: () => pingHuggingFace(),
  } satisfies UseQueryOptions;
}

export function usePingHuggingFaceQuery() {
  return useQuery(pingHuggingFaceQuery());
}
