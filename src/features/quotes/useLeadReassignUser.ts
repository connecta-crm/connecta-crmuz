import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Leads from '../../services/leads';
import { ReassignUserParams } from '../orders/useOrderReassignUser';

export function useLeadReassignUser() {
  const queryClient = useQueryClient();

  const {
    mutate: leadReassignUser,
    isPending: isLoadingReassign,
    isSuccess: isSuccessReassignUser,
  } = useMutation({
    mutationFn: ({ guid, model }: ReassignUserParams) =>
      Leads.leadReassignUser({ guid, model }),
    onSuccess: () => {
      message.success('Reassigned lead user!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['lead'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    leadReassignUser,
    isLoadingReassign,
    isSuccessReassignUser,
  };
}
