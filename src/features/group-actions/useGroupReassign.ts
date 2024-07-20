/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import GroupActions from '../../services/group-actions';

export type GroupReassignParams = {
  endpointType: string;
  ids: number[];
  user: number;
  reason: string;
};

export function useGroupReassign() {
  const queryClient = useQueryClient();
  const {
    mutate: groupReassign,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ ...payload }: GroupReassignParams) =>
      GroupActions.groupReassign({ ...payload }),
    onSuccess: () => {
      message.success('Reassigned successfully');
      // queryClient.invalidateQueries({ queryKey: ['ground'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { groupReassign, isLoading, error, isSuccess };
}
