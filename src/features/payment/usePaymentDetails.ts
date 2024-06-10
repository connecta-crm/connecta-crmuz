import { useQuery } from '@tanstack/react-query';
import Payment from '../../services/payment';

export function usePaymentDetails(id: number | null) {
  const {
    data: payment,
    isLoading: isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['payment-deatils', id],
    queryFn: () => Payment.getPaymentDetails(id),
    enabled: !!id,
  });
  return { payment, isLoadingTeam, error, isFetchingTeam };
}
