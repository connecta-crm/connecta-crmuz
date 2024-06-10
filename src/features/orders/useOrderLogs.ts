import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Orders from '../../services/orders';
import { DEFAULT_LIMIT } from '../../utils/constants';

export function useOrderLogs(id: number) {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));

  const {
    data: { results: orderLogs } = {},
    isPending: isLoadingOrderLogs,
    error,
  } = useQuery({
    queryKey: ['orderLogs', limit, offset, id],
    queryFn: () => Orders.getOrderLogs({ limit, offset, id }),
    enabled: !!id,
  });
  return { orderLogs, isLoadingOrderLogs, error };
}
