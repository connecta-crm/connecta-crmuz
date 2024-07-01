import { useQuery } from '@tanstack/react-query';
import Attachments from '../../services/attachments';

export function useNote(id: number, enabled: boolean) {
  const {
    isFetching: isLoadingNote,
    data: noteData,
    isError,
  } = useQuery({
    queryKey: ['getNote'],
    queryFn: () => Attachments.getNote(id),
    enabled: !!id && enabled,
    retry: false,
  });

  return { isLoadingNote, noteData, errorNote: isError };
}
