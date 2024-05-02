import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { pingStarlette } from '@/lib/actions/starlette/starlette.action';

const pingStarletteQueryKey = 'pingStarletteApi';

// Queries:
export function pingStarletteQuery() {
  return {
    queryKey: [pingStarletteQueryKey],
    queryFn: () => pingStarlette(),
  } satisfies UseQueryOptions;
}

export function usePingStarletteQuery() {
  return useQuery(pingStarletteQuery());
}
