import { useQuery } from '@tanstack/react-query';
import Providers from '../../services/providers';

export function useProviders(enabled: boolean) {
  const {
    isPending: isLoading,
    isFetching,
    data: providers,
    isError,
  } = useQuery({
    queryKey: ['providers'],
    queryFn: () => Providers.getProviders(),
    enabled,
  });

  return { isLoading, isFetching, providers, error: isError };
}
