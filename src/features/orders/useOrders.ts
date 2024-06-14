import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Orders from '../../services/orders';
import { DEFAULT_LIMIT } from '../../utils/constants';

export type OrdersParamsType = {
  limit: number;
  offset: number;
  status: string;
  q: string;
  source?: string[];
};

export function useOrders() {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));
  // const calculatedOffset = offset - 1;

  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || '';
  const sources = searchParams.getAll('source');

  const {
    data: { results: orders, count, sumPrice } = {},
    isPending: isLoadingOrders,
    error,
  } = useQuery({
    queryKey: ['orders', limit, offset, sources, q, status],
    queryFn: () =>
      Orders.getOrders({ limit, offset, source: sources, q, status }),
  });
  return { orders, count, sumPrice, isLoadingOrders, error };
}
