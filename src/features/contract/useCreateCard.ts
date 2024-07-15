import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';
export function useCreateCard() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoadingCard,
    error,
    isSuccess,
    
  } = useMutation({
    mutationFn: (item:FormData) =>
      Contract.createCard(item),
    onSuccess: () => {
      message.success('Success');
      queryClient.invalidateQueries({ queryKey: [''] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoadingCard, error, isSuccess };
}
