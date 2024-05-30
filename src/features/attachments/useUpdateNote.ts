/* eslint-disable @typescript-eslint/no-unused-vars */
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

export function useUpdateNote(sourceType: EndPointType) {
  const queryClient = useQueryClient();
  const {
    mutate: updateNote,
    isPending: isLoadingUpdateNote,
    error: errorUpdateNote,
  } = useMutation({
    mutationFn: ({ id, endpointType, text, user }: UpdateNoteParams) =>
      Attachments.updateNote({ id, endpointType, text, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${sourceType}Attachments`],
      });
      message.success('Note updated!');
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
