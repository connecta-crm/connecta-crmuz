import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';

export function useQuoteArchive() {
  const queryClient = useQueryClient();

  const {
    mutate: quoteArchive,
    isPending: isLoadingArchive,
    isSuccess: isSuccessArchive,
  } = useMutation({
    mutationFn: ({ guid, reason }: { guid: string; reason: string }) =>
      Quotes.quoteArchive(guid, reason),
    onSuccess: () => {
      message.success('Successfully archived!');
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      queryClient.invalidateQueries({ queryKey: ['quote'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    quoteArchive,
    isLoadingArchive,
    isSuccessArchive,
  };
}
