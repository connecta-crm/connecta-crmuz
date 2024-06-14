import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { InternationalTableDataType } from './internationalTableDataType';
import International from '../../services/international';
export function useUpdateInternational() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: InternationalTableDataType) => International.updateInternational(item),
    onSuccess: () => {
      message.success('International updated');
      queryClient.invalidateQueries({ queryKey: ['internationals'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
