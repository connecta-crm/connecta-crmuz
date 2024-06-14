import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Company from '../../services/company';
export type GroundParamsType = {
  url?: string;
};

export function useCompany(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: companys,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['companys', url],
    queryFn: () => Company.getCompany({ url }),
    enabled,
  });

  return { companys, isLoading, error, isFetchingTeam };
}
