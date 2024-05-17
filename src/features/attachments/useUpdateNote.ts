import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';

export type UpdateNoteParams = {
  id: number;
  endpointType: string;
  text: string;
  user: string | undefined;
};

export function useUpdateNote() {
  const queryClient = useQueryClient();

  const {
    mutate: updateNote,
    isPending: isLoadingUpdateNote,
    error: errorUpdateNote,
  } = useMutation({
    mutationFn: ({ id, endpointType, text, user }: UpdateNoteParams) =>
      Attachments.updateNote({ id, endpointType, text, user }),
    onSuccess: (data: unknown) => {
      queryClient.invalidateQueries({ queryKey: ['leadAttachments'] });
      message.success('Note updated!');
      console.log('UPDATED', data);
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    updateNote,
    isLoadingUpdateNote,
    errorUpdateNote,
  };
}
