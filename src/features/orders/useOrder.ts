import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import Orders from '../../services/orders';

export function useOrder(guid: string | null) {
  const {
    data: order,
    isPending: isLoading,
    isFetching: isFetchingOrder,
    error,
  } = useQuery({
    queryKey: ['order', guid],
    queryFn: () => Orders.getOrder(guid),
    enabled: !!guid,
    retry: 1,
  });

  if (error) message.error(error.message);

  return { order, isLoading, isFetchingOrder, error };
}
