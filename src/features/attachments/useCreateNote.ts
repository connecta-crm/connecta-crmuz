import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
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
      toast.success('Lead note created!');
    },
    onError: (err: string) => {
      console.log('ERROR', err);
      toast.error(err);
    },
  });

  return {
    createNote,
    isLoading,
  };
}
