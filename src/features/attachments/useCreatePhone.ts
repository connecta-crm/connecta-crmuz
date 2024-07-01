import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';
import { CreateNoteParams, EndPointType } from './useCreateNote';

export type CreatePhoneParams = {
  fromPhone: string;
  toPhone: string[];
} & CreateNoteParams;

export function useCreatePhone(sourceType: EndPointType) {
  const queryClient = useQueryClient();

  const {
    mutate: createPhone,
    isPending: isLoading,
    data: createdPhoneData,
  } = useMutation({
    mutationFn: ({
      rel,
      endpointType,
      text,
      user,
      fromPhone,
      toPhone,
    }: CreatePhoneParams) =>
      Attachments.createPhone({
        rel,
        endpointType,
        text,
        user,
        fromPhone,
        toPhone,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${sourceType}Attachments`],
      });
      message.success('Phone attachment created!');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createPhone,
    isLoading,
    createdPhoneData,
  };
}
