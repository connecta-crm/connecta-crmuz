import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export function useDeleteQuoteAttachments() {
  const queryClient = useQueryClient();

  const { mutate: deleteQuoteAttachments, isPending: isLoading } = useMutation({
    mutationFn: (id: number) => Attachments.deleteQuoteAttachments(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quoteAttachments'] });
      message.success('Quote attachments deleted!');
    },
    onError: (err: string) => {
      console.log('ERROR', err);
      message.error(err);
    },
  });

  return {
    deleteQuoteAttachments,
    isLoading,
  };
}
