import { useQuery } from '@tanstack/react-query';
import Ground from '../../services/ground';


export function useGroundDetails(id:number|null) {

  const {
    data:groundItem,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['ground-deatils', id],
    queryFn: () => Ground.getGroundDetails(id),
    enabled:!!id,
  });
  return { groundItem, isLoadingTeam, error,  isFetchingTeam };
}
