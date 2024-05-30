import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export function useDeleteLeadAttachments() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteLeadAttachments,
    isPending: isLoadingDeleteAttachForLead,
  } = useMutation({
    mutationFn: (id: number) => Attachments.deleteLeadAttachments(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leadAttachments'] });
      message.success('Lead attachments deleted!');
    },
    onError: (err: string) => {
      console.log('ERROR', err);
      message.error(err);
    },
  });

  return {
    deleteLeadAttachments,
    isLoadingDeleteAttachForLead,
  };
}
