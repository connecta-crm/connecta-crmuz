import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type ReassignUserParams = {
  guid: string;
  model: { user: number; reason: string };
};
export function useOrderReassignUser() {
  const queryClient = useQueryClient();

  const {
    mutate: orderReassignUser,
    isPending: isLoadingReassign,
    isSuccess: isSuccessReassignUser,
  } = useMutation({
    mutationFn: ({ guid, model }: ReassignUserParams) =>
      Orders.orderReassignUser({ guid, model }),
    onSuccess: () => {
      message.success('Reassigned order user!');
      queryClient.invalidateQueries({ queryKey: ['order'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    orderReassignUser,
    isLoadingReassign,
    isSuccessReassignUser,
  };
}
