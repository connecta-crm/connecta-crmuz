import { useQuery } from '@tanstack/react-query';
import Status from '../../services/status';

export function useStatusDetails(id: number | null) {
  const {
    data: status,
    isLoading: isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['status-deatils', id],
    queryFn: () => Status.getStatusDetails(id),
    enabled: !!id,
  });
  return { status, isLoadingTeam, error, isFetchingTeam };
}
