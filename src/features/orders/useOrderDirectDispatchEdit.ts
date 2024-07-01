import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type OrderDirectDispatchEditParamsType = {
  guid: string;
  updateOrderDirectDispatchModel: object;
};

export function useOrderDirectDispatchEdit() {
  const queryClient = useQueryClient();

  const {
    mutate: editOrderDirectDispatch,
    isPending: isLoadingDirectDispatch,
    isError: error,
    data: updatedOrderDirectDispatchData,
  } = useMutation({
    mutationFn: ({
      guid,
      updateOrderDirectDispatchModel,
    }: OrderDirectDispatchEditParamsType) =>
      Orders.editOrderDirectDispatch({ guid, updateOrderDirectDispatchModel }),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderDirectDispatchEdit'], data);
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      message.success('Order direct-dispatch successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return {
    isLoadingDirectDispatch,
    updatedOrderDirectDispatchData,
    editOrderDirectDispatch,
    error,
  };
}
