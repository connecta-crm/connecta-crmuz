import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';
import { ReassignUserParams } from '../orders/useOrderReassignUser';

export function useQuoteReassignUser() {
  const queryClient = useQueryClient();

  const {
    mutate: quoteReassignUser,
    isPending: isLoadingReassign,
    isSuccess: isSuccessReassignUser,
  } = useMutation({
    mutationFn: ({ guid, model }: ReassignUserParams) =>
      Quotes.quoteReassignUser({ guid, model }),
    onSuccess: () => {
      message.success('Reassigned quote user!');
      queryClient.invalidateQueries({ queryKey: ['quote'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    quoteReassignUser,
    isLoadingReassign,
    isSuccessReassignUser,
  };
}
