import { useQuery } from '@tanstack/react-query';
import Orders from '../../services/orders';

export function useOrderCreditCards(orderPayment: number) {
  const {
    data: orderCreditCards,
    isPending: isLoadingOrderCreditCards,
    error,
  } = useQuery({
    queryKey: ['orderCreditCards', orderPayment],
    queryFn: () => Orders.getOrderCreditCards(orderPayment),
  });
  return { orderCreditCards, isLoadingOrderCreditCards, error };
}
