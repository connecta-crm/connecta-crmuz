import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Teams from '../../services/teams';
export type TeamsParamsType = {
  url?: string;
};

export function useTeams(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data:teams,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['teams', url],
    queryFn: () => Teams.getTeam({ url }),
    enabled,
  });
  return { teams, isLoading, error,  isFetchingTeam };
}
