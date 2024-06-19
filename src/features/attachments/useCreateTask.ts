import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';
import { EndPointType } from './useCreateNote';

export type CreateTaskParams = {
  rel: number | undefined;
  endpointType: EndPointType;
  text: string;
  type: string;
  startTime: string | null;
  endTime: string | null;
  user: number | undefined;
  customer: number | undefined;
};

export function useCreateTask(sourceType: EndPointType) {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending: isLoading } = useMutation({
    mutationFn: ({
      rel,
      endpointType,
      text,
      type,
      startTime,
      endTime,
      user,
      customer,
    }: CreateTaskParams) =>
      Attachments.createTask({
        rel,
        endpointType,
        text,
        type,
        startTime,
        endTime,
        user,
        customer,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${sourceType}Attachments`],
      });
      message.success('Task attachment created!');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createTask,
    isLoading,
  };
}
