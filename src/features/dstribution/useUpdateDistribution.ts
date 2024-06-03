import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Distribution from '../../services/distribution';
import { DistributionDataType } from './DistributionDataType';
export function useUpdateDistribution() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: DistributionDataType) =>
      Distribution.updateDistribution(item),
    onSuccess: () => {
      message.success('Distribution updated');
      queryClient.invalidateQueries({ queryKey: ['distributions'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
