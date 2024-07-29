/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import GroupActions from '../../services/group-actions';

export type GroupSmsParams = {
  endpointType: 'quote' | 'leads' | 'order';
  ids: number[];
  message: string;
};

export function useGroupSms() {
  const queryClient = useQueryClient();
  const {
    mutate: groupSms,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ ...payload }: GroupSmsParams) =>
      GroupActions.groupSms({ ...payload }),
    onSuccess: () => {
      message.success('SMS is sent successfully');
      // queryClient.invalidateQueries({ queryKey: ['ground'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { groupSms, isLoading, error, isSuccess };
}
