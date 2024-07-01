import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Orders from '../../services/orders';

export function useOrderProviders(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const {
    data: orderProviders,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['orderProviders', status],
    queryFn: () => Orders.getOrderProviders(status),
    enabled,
  });
  return { orderProviders, isLoading, error };
}
