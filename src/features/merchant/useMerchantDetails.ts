import { useQuery } from '@tanstack/react-query';
import Merchant from '../../services/merchant';


export function useMerchantDetails(id:number|null) {

  const {
    data:merchant,
    isLoading:isLoadingTeam,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['ground-deatils', id],
    queryFn: () => Merchant.getMerchantDetails(id),
    enabled:!!id,
  });
  return { merchant, isLoadingTeam, error,  isFetchingTeam };
}
