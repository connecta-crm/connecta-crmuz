import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';
import { CreatePaymentCreditCardDataType } from '../drawer/tabs/TabChargePaymentModal';

export function useOrderPaymentCreditCardCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrderPaymentCreditCard,
    isPending: isLoading,
    isError: error,
    data: createdOrderPaymentCreditCardData,
  } = useMutation({
    mutationFn: ({ ...data }: CreatePaymentCreditCardDataType) =>
      Orders.createOrderPaymentCreditCard({
        ...data,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderCreatePaymentCreditCard'], data);
      queryClient.invalidateQueries({ queryKey: ['orderCreditCards'] });
      message.success('Order Credit Card Payment successfully created');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoading,
    createOrderPaymentCreditCard,
    createdOrderPaymentCreditCardData,
    error,
  };
}
