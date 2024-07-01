import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';

export function useLeadArchive() {
  const queryClient = useQueryClient();

  const {
    mutate: leadArchive,
    isPending: isLoadingArchive,
    isSuccess: isSuccessArchive,
  } = useMutation({
    mutationFn: ({ guid, reason }: { guid: string; reason: string }) =>
      Leads.leadArchive(guid, reason),
    onSuccess: () => {
      message.success('Successfully archived!');
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      queryClient.invalidateQueries({ queryKey: ['lead'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    leadArchive,
    isLoadingArchive,
    isSuccessArchive,
  };
}
