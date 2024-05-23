import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { OrdersDataType } from '../../models/OrderDataType';
import Orders from '../../services/orders';
export function useCreateOrder() {
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (item: OrdersDataType) => Orders.createOrder(item),
    onSuccess: () => {
      message.success('Order created');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, isSuccess };
}
