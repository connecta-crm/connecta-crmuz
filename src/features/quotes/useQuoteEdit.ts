import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';

export type QuoteEditParamsType = {
  guid: string;
  updateQuoteModel: object;
};

export function useQuoteEdit() {
  const queryClient = useQueryClient();

  const {
    mutate: editQuote,
    isPending: isLoading,
    isError: error,
    data: updatedQuoteData,
  } = useMutation({
    mutationFn: ({ guid, updateQuoteModel }: QuoteEditParamsType) =>
      Quotes.editQuote({ guid, updateQuoteModel }),
    onSuccess: (data) => {
      queryClient.setQueryData(['quoteEdit'], data);
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
      message.success('Quote successfully edited');
    },
    onError: (err) => message.error(err.message),
  });

  return { isLoading, updatedQuoteData, editQuote, error };
}
