import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';
export function useCreateContract() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: { agreement: File; terms: File,guidId:string,id:string }) =>
      Contract.createContract(item),
    onSuccess: () => {
      message.success('Success');
      queryClient.invalidateQueries({ queryKey: ['contract'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
