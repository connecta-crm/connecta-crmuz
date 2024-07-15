import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export function useOrderPaymentSendCCA() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrderPaymentSendCCA,
    isPending: isLoadingSendCCA,
    isError: error,
  } = useMutation({
    mutationFn: (payment: number) => Orders.createOrderPaymentSendCCA(payment),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderCreatePaymentSendCCA'], data);
      queryClient.invalidateQueries({ queryKey: ['orderPayments'] });
      message.success('CCA successfully sent');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoadingSendCCA,
    createOrderPaymentSendCCA,
    error,
  };
}
