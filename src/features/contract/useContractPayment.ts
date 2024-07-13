import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Contract from '../../services/contract';

export function useContractPayment(enabled: boolean, id: string | number) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: contractpayments,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['contract-payment', url],
    queryFn: () => Contract.getPayment(id),
    enabled,
  });

  return { contractpayments, isLoading, error, isFetchingTeam };
}
