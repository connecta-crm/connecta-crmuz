import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Merchant from '../../services/merchant';
import { MerchantTableDataType } from './merchantTableDataType';
export function useUpdateMerchant() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: MerchantTableDataType) => Merchant.updateMerchant(item),
    onSuccess: () => {
      message.success('Merchant updated');
      queryClient.invalidateQueries({ queryKey: ['merchants'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
