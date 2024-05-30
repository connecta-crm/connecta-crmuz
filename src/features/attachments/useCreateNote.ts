import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export type EndPointType = 'lead' | 'quote' | 'order';

export type CreateNoteParams = {
  rel: number | undefined;
  endpointType: EndPointType;
  text: string;
  user: number | undefined;
};

export function useCreateNote() {
  const queryClient = useQueryClient();

  let attachmentType: EndPointType;

  const { mutate: createNote, isPending: isLoading } = useMutation({
    mutationFn: ({ rel, endpointType, text, user }: CreateNoteParams) => {
      attachmentType = endpointType;
      return Attachments.createNote({ rel, endpointType, text, user });
    },
    onSuccess: (data: unknown) => {
      queryClient.invalidateQueries({
        queryKey: [`${attachmentType}Attachments`],
      });
      console.log('NOTE', data);
      message.success('Note created!');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createNote,
    isLoading,
  };
}
