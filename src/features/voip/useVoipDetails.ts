import { useQuery } from '@tanstack/react-query';
import Voip from '../../services/voip';

export function useVoipDetails(id: number | null) {
  const {
    data: voip,
    isLoading: isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['voip-deatils', id],
    queryFn: () => Voip.getVoipDetails(id),
    enabled: !!id,
  });
  return { voip, isLoadingTeam, error, isFetchingTeam };
}
