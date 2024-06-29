import { useQuery } from '@tanstack/react-query';
import Orders from '../../services/orders';

export function useContractList(order: string, enabled: boolean) {
  const {
    data: contractList,
    isPending: isLoadingContractList,
    isSuccess,
  } = useQuery({
    queryKey: ['orderContractList', order],
    queryFn: () => Orders.getContractList(order),
    enabled,
    retry: 2,
  });
  return { contractList, isLoadingContractList, isSuccess };
}
