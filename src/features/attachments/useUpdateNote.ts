import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';
import { EndPointType } from './useCreateNote';

export type UpdateNoteParams = {
  id: number;
  endpointType: EndPointType;
  text: string;
  user: string | undefined;
};

export function useUpdateNote() {
  const queryClient = useQueryClient();

  let attachmentType: EndPointType;

  const {
    mutate: updateNote,
    isPending: isLoadingUpdateNote,
    error: errorUpdateNote,
  } = useMutation({
    mutationFn: ({ id, endpointType, text, user }: UpdateNoteParams) => {
      attachmentType = endpointType;
      return Attachments.updateNote({ id, endpointType, text, user });
    },
    onSuccess: (data: unknown) => {
      queryClient.invalidateQueries({
        queryKey: [`${attachmentType}Attachments`],
      });
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
