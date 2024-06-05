import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Ground from '../../services/ground';
export type GroundParamsType = {
  url?: string;
};

export function useGround(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: { results: ground } = {},
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['ground', url],
    queryFn: () => Ground.getGround({ url }),
    enabled,
  });

  return { ground, isLoading, error, isFetchingTeam };
}
