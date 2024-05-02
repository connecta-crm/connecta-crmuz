import { useQuery } from '@tanstack/react-query';
import Providers from '../../services/providers';

export function useProviders(enabled: boolean) {
  const {
    isPending: isLoading,
    data: providers,
    isError,
  } = useQuery({
    queryKey: ['providers'],
    queryFn: () => Providers.getProviders(),
    enabled,
  });

  return { isLoading, providers, error: isError };
}
