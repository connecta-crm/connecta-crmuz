import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Ground from '../../services/ground';
import { GroundTableDataType } from './groundTableDataType';
export function useCreateGround() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: GroundTableDataType) => Ground.createGround(item),
    onSuccess: () => {
      message.success('Ground created');
      queryClient.invalidateQueries({ queryKey: ['ground'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
