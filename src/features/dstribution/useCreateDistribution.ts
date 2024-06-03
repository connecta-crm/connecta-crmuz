import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Distribution from '../../services/distribution';
import { DistributionDataType } from './DistributionDataType';

export function useCreateDistribution() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: DistributionDataType) =>
      Distribution.createDistribution(item),
    onSuccess: () => {
      message.success('Distribution created');
      queryClient.invalidateQueries({ queryKey: ['distributions'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
