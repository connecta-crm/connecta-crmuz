import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export type CreateContractParams = {
  signed: boolean;
  contractType: string;
  order: string;
};
export function useCreateContract() {
  const queryClient = useQueryClient();

  const {
    mutate: createContract,
    isPending: isLoadingContract,
    isSuccess,
  } = useMutation({
    mutationFn: ({ signed, contractType, order }: CreateContractParams) =>
      Orders.createContract({ signed, contractType, order }),
    onSuccess: () => {
      message.success('Contract is sent');
      queryClient.invalidateQueries({ queryKey: ['orderContractList'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { createContract, isLoadingContract, isSuccess };
}
