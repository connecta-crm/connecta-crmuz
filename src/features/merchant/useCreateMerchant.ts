import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Merchant from '../../services/merchant';
import { MerchantTableDataType } from './merchantTableDataType';
export function useCreateMerchant() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: MerchantTableDataType) => Merchant.createMerchant(item),
    onSuccess: () => {
      message.success('Merchant created');
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
