import { useQuery } from '@tanstack/react-query';
import Regions from '../../services/regions';


export function useRegionDetails(id:number|null) {

  const {
    data:region,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['region-deatils', id],
    queryFn: () => Regions.getRegionDetails(id),
    enabled:!!id,
  });
  return { region, isLoadingTeam, error,  isFetchingTeam };
}
