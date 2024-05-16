import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export type CreateNoteParams = {
  rel: number | undefined;
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
