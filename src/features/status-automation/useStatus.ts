import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Status from '../../services/status';
export type GroundParamsType = {
  url?: string;
};

export function useStatus(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: statuses,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['status', url],
    queryFn: () => Status.getStatus({ url }),
    enabled,
  });

  return { statuses, isLoading, error, isFetchingTeam };
}
