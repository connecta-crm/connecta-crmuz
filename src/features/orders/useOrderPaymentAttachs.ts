import { useQuery } from '@tanstack/react-query';
import Orders from '../../services/orders';

export function useOrderPaymentAttachs(orderPayment: number, enabled: boolean) {
  console.log('sss', orderPayment, enabled);
  const {
    data: orderPaymentAttachs,
    isPending: isLoadingOrderPaymentAttachs,
    error,
  } = useQuery({
    queryKey: ['orderPaymentAttachs', orderPayment],
    queryFn: () => Orders.getOrderPaymentAttachs(orderPayment),
    enabled,
  });
  return { orderPaymentAttachs, isLoadingOrderPaymentAttachs, error };
}
