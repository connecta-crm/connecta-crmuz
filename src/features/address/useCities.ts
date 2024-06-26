import { useQuery } from '@tanstack/react-query';
import Address from '../../services/address';

export function useCities(q: string | null) {
  const {
    isFetching: isLoading,
    data: { results: cities } = {},
    isError,
  } = useQuery({
    queryKey: ['cities', q],
    queryFn: () => Address.getCities(q),
    enabled: !!q,
  });

  return { isLoading, cities, error: isError };
}
