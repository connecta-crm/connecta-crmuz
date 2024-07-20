import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderPaymentRefundParams = {
  amount: number;
  direction: string;
  transactionId: number;
  order: string;
};

export function useOrderPaymentRefund() {
  const queryClient = useQueryClient();
  const {
    mutate: refundPayment,
    isPending: isLoading,
    isError: error,
  } = useMutation({
    mutationFn: ({ ...payload }: OrderPaymentRefundParams) =>
      Orders.refundPayment({ ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderPayments'] });
      message.success('Refund successfully refunded');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, refundPayment, error };
}
