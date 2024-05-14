import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export type CreateNoteParams = {
  rel: number;
  endpointType: string;
  text: string;
  user: number | undefined;
};

export function useCreateNote() {
  const queryClient = useQueryClient();

  const { mutate: createNote, isPending: isLoading } = useMutation({
    mutationFn: ({ rel, endpointType, text, user }: CreateNoteParams) =>
      Attachments.createNote({ rel, endpointType, text, user }),
    onSuccess: (data: unknown) => {
      queryClient.invalidateQueries({ queryKey: ['leadAttachments'] });
      console.log('NOTE', data);
      message.success('Lead note created!');
    },
    onError: (err: string) => {
      console.log('ERROR', err);
      message.error(err);
    },
  });

  return {
    createNote,
    isLoading,
  };
}
