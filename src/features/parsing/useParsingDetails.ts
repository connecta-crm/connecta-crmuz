import { useQuery } from '@tanstack/react-query';
import Parsing from '../../services/parsing';


export function useParsingDetails(id:number|null) {

  const {
    data:parsing,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['parsing-deatils', id],
    queryFn: () => Parsing.getParsingDetails(id),
    enabled:!!id,
  });
  return { parsing, isLoadingTeam, error,  isFetchingTeam };
}
