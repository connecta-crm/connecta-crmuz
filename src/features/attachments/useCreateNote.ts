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

export function useCreateNote(sourceType: EndPointType) {
  const queryClient = useQueryClient();

  const {
    mutate: createNote,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ rel, endpointType, text, user }: CreateNoteParams) =>
      Attachments.createNote({ rel, endpointType, text, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${sourceType}Attachments`],
      });
      message.success('Note created!');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createNote,
    isLoading,
    error,
  };
}
