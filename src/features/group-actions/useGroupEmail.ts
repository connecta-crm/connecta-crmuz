/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import GroupActions from '../../services/group-actions';

export type GroupEmailParams = {
  endpointType: 'quote' | 'leads' | 'order';
  ids: number[];
  message: string;
  subject: string;
  bccList: string[];
  ccList: string[];
};

export function useGroupEmail() {
  const queryClient = useQueryClient();
  const {
    mutate: groupEmail,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: ({ ...payload }: GroupEmailParams) =>
      GroupActions.groupEmail({ ...payload }),
    onSuccess: () => {
      message.success('SMS is sent successfully');
      // queryClient.invalidateQueries({ queryKey: ['ground'] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { groupEmail, isLoading, error, isSuccess };
}
