import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Quote from '../../services/quotes';
export function useConvertToQuote() {
  const queryClient = useQueryClient();

  const {
    mutate: convertToOrder,
    isPending: isLoadingConvertToOrder,
    isSuccess: isSuccessConvertToOrder,
  } = useMutation({
    mutationFn: ({ id, model }: { id: number; model: unknown }) =>
      Quote.convertToOrder({ id, model }),
    onSuccess: () => {
      message.success('Quote converted to order');
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return {
    convertToOrder,
    isLoadingConvertToOrder,
    isSuccessConvertToOrder,
  };
}
