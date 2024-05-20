import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useModal } from '../../context/ModalContext';
import { OrdersDataType } from '../../models/OrdersDataType';
import Orders from '../../services/orders';
export function useCreateOrder() {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (item: OrdersDataType) => Orders.createOrder(item),
    onSuccess: () => {
      hideModal();
      message.success('Order created');
      queryClient.invalidateQueries({ queryKey: ['order-create'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, isSuccess };
}
