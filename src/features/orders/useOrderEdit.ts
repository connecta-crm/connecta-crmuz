import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderEditParamsType = {
  guid: string;
  updateOrderModel: object;
};

export function useOrderEdit() {
  const queryClient = useQueryClient();

  const {
    mutate: editOrder,
    isPending: isLoading,
    isError: error,
    data: updatedOrderData,
  } = useMutation({
    mutationFn: ({ guid, updateOrderModel }: OrderEditParamsType) =>
      Orders.editOrder({ guid, updateOrderModel }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderEdit'], data);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      message.success('Order successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, updatedOrderData, editOrder, error };
}
