import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { GroundTableDataType } from './groundTableDataType';
import Ground from '../../services/ground';
export function useUpdateGround() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: GroundTableDataType) => Ground.updateGround(item),
    onSuccess: () => {
      message.success('Groung updated');
      queryClient.invalidateQueries({ queryKey: ['ground'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
