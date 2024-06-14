import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Voip from '../../services/voip';
import { VoipTableDataType } from './voipTableDataType';
export function useUpdateVoip() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: VoipTableDataType) => Voip.updateVoip(item),
    onSuccess: () => {
      message.success('Voip updated');
      queryClient.invalidateQueries({ queryKey: ['voips'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
