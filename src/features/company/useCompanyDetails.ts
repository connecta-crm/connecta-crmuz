import { useQuery } from '@tanstack/react-query';
import Company from '../../services/company';

export function useCompanyDetails(id:number|null) {

  const {
    data:company,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['company-deatils', id],
    queryFn: () => Company.getCompanyDetails(id),
    enabled:!!id,
  });
  return { company, isLoadingTeam, error,  isFetchingTeam };
}
