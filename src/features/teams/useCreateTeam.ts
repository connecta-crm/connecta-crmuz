import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { TeamsTableDataType } from './teamsTableDataType';
import Teams from '../../services/teams';
export function useCreateTeam() {
  const queryClient = useQueryClient();
  const {
    mutate: create,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (item: TeamsTableDataType) => Teams.createTeam(item),
    onSuccess: () => {
      message.success('Team created');
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { create, isLoading, error, isSuccess };
}
