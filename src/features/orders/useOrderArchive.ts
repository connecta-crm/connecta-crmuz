import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export function useOrderArchive() {
  const queryClient = useQueryClient();

  const {
    mutate: orderArchive,
    isPending: isLoadingArchive,
    isSuccess: isSuccessArchive,
  } = useMutation({
    mutationFn: ({ guid, reason }: { guid: string; reason: string }) =>
      Orders.orderArchive(guid, reason),
    onSuccess: () => {
      message.success('Successfully archived!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    orderArchive,
    isLoadingArchive,
    isSuccessArchive,
  };
}
