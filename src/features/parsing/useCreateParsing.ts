import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Parsing from '../../services/parsing';
import { ParsingTableDataType } from './parsingTableDataType';
export function useCreateParsing() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: ParsingTableDataType) => Parsing.createParsing(item),
    onSuccess: () => {
      message.success('Lead parsing created');
      queryClient.invalidateQueries({ queryKey: ['parsing'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
