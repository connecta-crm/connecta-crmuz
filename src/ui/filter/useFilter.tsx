import { useQuery } from '@tanstack/react-query';
import Filter from '../../services/filter';

export function useGlobalFilter(param: { type: string; q: string }) {
  const {
    data: { data: data } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['global-search', param],
    queryFn: () => Filter.getFilter(param),
    enabled: !!param.q,
  });

  return { data, isLoading, error };
}
