import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Merchant from '../../services/merchant';
export type GroundParamsType = {
  url?: string;
};

export function useMerchant(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: merchants,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['merchants', url],
    queryFn: () => Merchant.getMerchant({ url }),
    enabled,
  });

  return { merchants, isLoading, error, isFetchingTeam };
}
