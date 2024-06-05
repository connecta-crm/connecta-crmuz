import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Regions from '../../services/regions';
export type GroundParamsType = {
  url?: string;
};

export function useRegions(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: { results: regions } = {},
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['regions', url],
    queryFn: () => Regions.getRegions({ url }),
    enabled,
  });

  return { regions, isLoading, error, isFetchingTeam };
}
