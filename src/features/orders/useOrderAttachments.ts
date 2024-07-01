import { useQuery } from '@tanstack/react-query';
import Orders from '../../services/orders';
import { useAppSelector } from '../../store/hooks';
import { getOrderData } from './orderSlice';

export function useOrderAttachments(enabled: boolean) {
  const { id } = useAppSelector(getOrderData);
  const {
    data: { results: orderAttachments, count } = {},
    isFetching: isLoadingOrderAttachments,
    error,
  } = useQuery({
    queryKey: ['orderAttachments'],
    queryFn: () => Orders.getOrderAttachments(id),
    retry: false,
    enabled,
  });
  return { orderAttachments, count, isLoadingOrderAttachments, error };
}
