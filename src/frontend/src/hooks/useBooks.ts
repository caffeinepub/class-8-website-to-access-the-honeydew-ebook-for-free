import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Book } from '../backend';

export function useBooks() {
  const { actor, isFetching } = useActor();

  return useQuery<Book[]>({
    queryKey: ['books'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBooks();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Limit retries to prevent infinite loops
    refetchOnWindowFocus: false, // Disable refetch on window focus
    refetchOnReconnect: false, // Disable refetch on reconnect
  });
}
