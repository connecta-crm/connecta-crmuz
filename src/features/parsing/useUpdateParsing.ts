import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Parsing from '../../services/parsing';
import { ParsingType } from './Parsing';
export function useUpdateParsing() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: ParsingType) => Parsing.updateParsing(item),
    onSuccess: () => {
      message.success('Lead parsing updated');
      queryClient.invalidateQueries({ queryKey: ['parsing'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
