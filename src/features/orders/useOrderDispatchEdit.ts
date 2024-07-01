import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderDispatchEditParamsType = {
  guid: string;
  updateOrderDispatchModel: object;
};

export function useOrderDispatchEdit() {
  const queryClient = useQueryClient();

  const {
    mutate: editOrderDispatch,
    isPending: isLoadingDispatch,
    isError: error,
    data: updatedOrderDispatchData,
  } = useMutation({
    mutationFn: ({
      guid,
      updateOrderDispatchModel,
    }: OrderDispatchEditParamsType) =>
      Orders.editOrderDispatch({ guid, updateOrderDispatchModel }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderDispatchEdit'], data);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      message.success('Order dispatch successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoadingDispatch,
    updatedOrderDispatchData,
    editOrderDispatch,
    error,
  };
}
