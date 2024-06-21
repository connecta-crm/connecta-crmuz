import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Status from '../../services/status';
import { StatusTableDataType } from './StatusTableDataType';
// import { VoipTableDataType } from './PaymentTableDataType';
export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data: StatusTableDataType) => Status.updateStatus(data),
    onSuccess: () => {
      message.success('Status automation updated');
      queryClient.invalidateQueries({ queryKey: ['status'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
