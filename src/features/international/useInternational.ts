import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import  International from '../../services/international';
export type InternationalParamsType = {
  url?: string;
};

export function useInternational(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: { results: internationals } = {},
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['internationals', url],
    queryFn: () => International.getInternational({ url }),
    enabled,
  });

  return { internationals, isLoading, error, isFetchingTeam };
}
