import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Voip from '../../services/voip';
export type GroundParamsType = {
  url?: string;
};

export function useVoip(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data:voips,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['voips', url],
    queryFn: () => Voip.getVoips({ url }),
    enabled,
  });

  return { voips, isLoading, error, isFetchingTeam };
}
