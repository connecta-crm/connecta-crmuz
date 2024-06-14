import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export function useDeleteOrderAttachments() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteOrderAttachments,
    isPending: isLoadingDeleteAttachForOrder,
  } = useMutation({
    mutationFn: (id: number) => Attachments.deleteOrderAttachments(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderAttachments'] });
      message.success('Order attachments deleted!');
    },
    onError: (err: string) => {
      console.log('ERROR', err);
      message.error(err);
    },
  });

  return {
    deleteOrderAttachments,
    isLoadingDeleteAttachForOrder,
  };
}
