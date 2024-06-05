import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { RegionsTableDataType } from './RegionsTableDataType';
import Regions from '../../services/regions';
export function useCreateRegion() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: RegionsTableDataType) => Regions.createRegion(item),
    onSuccess: () => {
      message.success('Hawaii and Alaska created');
      queryClient.invalidateQueries({ queryKey: ['regions'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
