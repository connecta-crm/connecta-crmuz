import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Status from '../../services/status';
import { StatusTableDataType } from './StatusTableDataType';
// import { PaymentTableDataType } from './PaymentTableDataType';
export function useCreateStatus() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: StatusTableDataType) => Status.createStatus(item),
    onSuccess: () => {
      message.success('Status automation created');
      queryClient.invalidateQueries({ queryKey: ['status'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
