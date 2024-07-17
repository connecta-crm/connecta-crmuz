import { useQuery } from '@tanstack/react-query';
import Attachments from '../../services/attachments';

export function useFile(id: number) {
  const {
    isFetching: isLoadingFile,
    data: fileData,
    isError,
  } = useQuery({
    queryKey: ['getFile'],
    queryFn: () => Attachments.getFile(id),
    enabled: !!id,
    retry: false,
  });

  return { isLoadingFile, fileData, errorFile: isError };
}
