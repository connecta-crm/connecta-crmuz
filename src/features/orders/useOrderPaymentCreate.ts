import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';
import { CreatePaymentDataType } from '../drawer/tabs/TabCreatePaymentModal';

export function useOrderPaymentCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrderPayment,
    isPending: isLoading,
    isError: error,
    data: createdOrderPaymentData,
  } = useMutation({
    mutationFn: ({
      name,
      quantity,
      amount,
      discount,
      paymentType,
      surchargeFeeRate,
      chargeType,
      direction,
      order,
    }: CreatePaymentDataType) =>
      Orders.createOrderPayment({
        name,
        quantity,
        amount,
        discount,
        paymentType,
        surchargeFeeRate,
        chargeType,
        direction,
        order,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderCreatePayment'], data);
      // queryClient.invalidateQueries({ queryKey: ['orders'] });
      // queryClient.invalidateQueries({ queryKey: ['order'] });
      message.success('Order Payment successfully created');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, createOrderPayment, createdOrderPaymentData, error };
}
