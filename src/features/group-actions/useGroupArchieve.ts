/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import GroupActions from '../../services/group-actions';
import { SourceType } from '../../ui/Drawer';

export type GroupArchieveParams = {
  endpointType: string;
  ids: number[];
  reason: string;
};

export function useGroupArchieve(endpointType: SourceType) {
  const queryClient = useQueryClient();
  const {
    mutate: groupArchieve,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ ...payload }: GroupArchieveParams) =>
      GroupActions.groupArchieve({ ...payload }),
    onSuccess: () => {
      message.success('Archieved successfully');
      // queryClient.invalidateQueries({ queryKey: [`${endpointType}`] });
      queryClient.invalidateQueries({ queryKey: [`${endpointType}s`] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { groupArchieve, isLoading, error, isSuccess };
}
