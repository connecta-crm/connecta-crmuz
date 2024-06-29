import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export function useContractSendSMS() {
  const queryClient = useQueryClient();

  const {
    mutate: contractSendSMS,
    isPending: isLoadingContractSendSMS,
    isSuccess,
  } = useMutation({
    mutationFn: () => Orders.contractSendSMS(),
    onSuccess: () => {
      message.success('Contract SMS is sended');
      queryClient.invalidateQueries({ queryKey: ['orderContractList'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { contractSendSMS, isLoadingContractSendSMS, isSuccess };
}
