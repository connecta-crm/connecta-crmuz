import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Parsing from '../../services/parsing';
export function useDeleteParsing() {
  const queryClient = useQueryClient();
  const {
    mutate:deleted,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: string|undefined) => Parsing.deleteParsing(item),
    onSuccess: () => {
      message.success('Lead parsing value deleted');
      queryClient.invalidateQueries({ queryKey: ['parsing'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { deleted, isLoading, error, isSuccess };
}
