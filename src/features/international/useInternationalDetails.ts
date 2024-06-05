import { useQuery } from '@tanstack/react-query';
import International from '../../services/international';


export function useInternationalDetails(id:number|null) {

  const {
    data:international,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['international-deatils', id],
    queryFn: () => International.getinternationalDetails(id),
    enabled:!!id,
  });
  return { international, isLoadingTeam, error,  isFetchingTeam };
}
