import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useModal } from '../../context/ModalContext';
import { QuoteDataType } from '../../models/QuoteDataType';
import Quote from '../../services/quotes';
export function useCreateQuote() {
  const { hideModal } = useModal();
  const queryClient = useQueryClient();

  const {
    mutate: create,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: (item: QuoteDataType) => Quote.createQuote(item),
    onSuccess: () => {
      hideModal();
      message.success('Quote created');
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, isSuccess };
}
