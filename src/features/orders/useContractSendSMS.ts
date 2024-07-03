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
    mutationFn: (contract: number) => Orders.contractSendSMS(contract),
    onSuccess: () => {
      message.success('Contract SMS is sent');
      queryClient.invalidateQueries({ queryKey: ['orderContractList'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { contractSendSMS, isLoadingContractSendSMS, isSuccess };
}
