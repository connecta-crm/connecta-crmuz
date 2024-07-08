import { useQuery } from '@tanstack/react-query';
import Orders from '../../services/orders';

export function useOrderPayments(order: string) {
  const {
    data: orderPayments,
    isPending: isLoadingOrderPayments,
    error,
  } = useQuery({
    queryKey: ['orderPayments', order],
    queryFn: () => Orders.getOrderPayments(order),
    enabled: !!order,
  });
  return { orderPayments, isLoadingOrderPayments, error };
}
