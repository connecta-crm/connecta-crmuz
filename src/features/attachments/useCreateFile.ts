import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import Attachments from '../../services/attachments';
import { EndPointType } from './useCreateNote';

export type CreateFileParams = {
  rel: number | undefined;
  endpointType: EndPointType;
  text: string;
  file: string;
  user: number | undefined;
};

export function useCreateFile(sourceType: EndPointType) {
  const queryClient = useQueryClient();

  const {
    mutate: createFile,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ rel, endpointType, text, file, user }: CreateFileParams) =>
      Attachments.createFile({ rel, endpointType, text, file, user }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${sourceType}Attachments`],
      });
      message.success('File created!');
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  return {
    createFile,
    isLoading,
    error,
  };
}
