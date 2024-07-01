import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';
import { EndPointType } from './useCreateNote';

export type CreateEmailParams = {
  fromEmail: string;
  toEmail: string[];
  rel: number | undefined;
  endpointType: EndPointType;
  text: string;
  subject: string | undefined;
};

export function useCreateEmail(sourceType: EndPointType) {
  const queryClient = useQueryClient();

  const {
    mutate: createEmail,
    isPending: isLoading,
    data: createdEmailData,
  } = useMutation({
    mutationFn: ({
      rel,
      endpointType,
      text,
      subject,
      fromEmail,
      toEmail,
    }: CreateEmailParams) =>
      Attachments.createEmail({
        rel,
        endpointType,
        text,
        fromEmail,
        toEmail,
        subject,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${sourceType}Attachments`],
      });
      message.success('Email attachment created!');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createEmail,
    isLoading,
    createdEmailData,
  };
}
