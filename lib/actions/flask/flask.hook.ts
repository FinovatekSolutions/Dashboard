import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { pingFlaskApi } from '@/lib/actions/flask/flask.action';

const pingFlaskApiQueryKey = 'pingFlaskApi';

// Queries:
export function pingFlaskApiQuery() {
  return {
    queryKey: [pingFlaskApiQueryKey],
    queryFn: () => pingFlaskApi(),
  } satisfies UseQueryOptions;
}

export function usePingFlaskApiQuery() {
  return useQuery(pingFlaskApiQuery());
}
