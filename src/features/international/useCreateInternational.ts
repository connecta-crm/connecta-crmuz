import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import International from '../../services/international';
import { InternationalTableDataType } from './internationalTableDataType';
export function useCreateInternational() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: InternationalTableDataType) => International.createInternatioanl(item),
    onSuccess: () => {
      message.success('International created');
      queryClient.invalidateQueries({ queryKey: ['internationals'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
