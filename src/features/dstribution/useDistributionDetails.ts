import { useQuery } from '@tanstack/react-query';
import Distribution from '../../services/distribution';

export function useDistributionDetails(id: number | null) {
  const {
    data: distribution,
    isLoading: isLoadingUser,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['distribution-deatils', id],
    queryFn: () => Distribution.getDistributionDetails(id),
    enabled: !!id,
  });
  return { distribution, isLoadingUser, error, isFetchingTeam };
}
