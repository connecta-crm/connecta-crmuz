import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Contract from '../../services/contract';
export function useCreateContract() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoadingContract,
    error,
    isSuccess,
    
  } = useMutation({
    mutationFn: (item: {form:FormData,guidId:string,id:string }) =>
      Contract.createContract(item),
    onSuccess: () => {
      message.success('Success');
      queryClient.invalidateQueries({ queryKey: ['contract'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoadingContract, error, isSuccess };
}
