import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Contract from '../../services/contract';

export function useContract(enabled: boolean, param: { text: string; id: string }) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: contracts,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['contract', url],
    queryFn: () => Contract.getContract(param),
    enabled,
  });

  return { contracts, isLoading, error, isFetchingTeam };
}
