import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { TeamsTableDataType } from './teamsTableDataType';
import Teams from '../../services/teams';
export function useUpdateTeam() {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: TeamsTableDataType,) => Teams.updateTeam(item),
    onSuccess: () => {
      message.success('Team updated');
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { update, isLoading, error, isSuccess };
}
