import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Orders from '../../services/orders';

export type OrdersParamsType = {
  limit: number;
  offset: number;
  status: string;
  q: string;
  source?: string[];
  user?: string[];
};

export function useOrders() {
  const { limit, offset, q, status, sources, user } = useGetSearchParams();

  const {
    data: { results: orders, count, sumPrice } = {},
    isPending: isLoadingOrders,
    error,
  } = useQuery({
    queryKey: ['orders', limit, offset, sources, q, status, user],
    queryFn: () =>
      Orders.getOrders({ limit, offset, source: sources, q, status, user }),
  });
  return { orders, count, sumPrice, isLoadingOrders, error };
}
