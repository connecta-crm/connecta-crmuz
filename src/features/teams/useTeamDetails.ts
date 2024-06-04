import { useQuery } from '@tanstack/react-query';
import Teams from '../../services/teams';


export function useTeamsDetails(id:number|null) {

  const {
    data:team,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['teams-deatils', id],
    queryFn: () => Teams.getTeamDetails(id),
    enabled:!!id,
  });
  return { team, isLoadingTeam, error,  isFetchingTeam };
}
