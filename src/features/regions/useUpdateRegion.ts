import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { RegionsTableDataType } from './RegionsTableDataType';
import Regions from '../../services/regions';
export function useUpdateRegion() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: RegionsTableDataType) => Regions.updateRegion(item),
    onSuccess: () => {
      message.success('Hawaii and Alaska updated');
      queryClient.invalidateQueries({ queryKey: ['regions'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
