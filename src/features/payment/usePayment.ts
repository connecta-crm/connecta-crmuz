import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Payment from '../../services/payment';
export type GroundParamsType = {
  url?: string;
};

export function usePayment(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: payments,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['payments', url],
    queryFn: () => Payment.getPayment({ url }),
    enabled,
  });

  return { payments, isLoading, error, isFetchingTeam };
}
