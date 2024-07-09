import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export function useOrderAttachCreate() {
  const queryClient = useQueryClient();
  const {
    mutate: createOrderAttach,
    isPending: isLoading,
    isError: error,
    data: createdOrderAttachData,
  } = useMutation({
    mutationFn: (payload) => Orders.createOrderAttach(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderCreateAttach'], data);
      queryClient.invalidateQueries({ queryKey: ['orderAttachs'] });
      message.success('Successfully attached');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, createOrderAttach, createdOrderAttachData, error };
}
