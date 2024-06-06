import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Voip from '../../services/voip';
import { VoipTableDataType } from './voipTableDataType';
export function useCreateVoip() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: VoipTableDataType) => Voip.createVoip(item),
    onSuccess: () => {
      message.success('Voip created');
      queryClient.invalidateQueries({ queryKey: ['voips'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
