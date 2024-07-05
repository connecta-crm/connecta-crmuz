import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import Customers from '../../services/customers';

export function useCustomer(id: number | string | null) {
  const {
    data: customer,
    isPending: isLoadingCustomer,
    isFetching: isFetchingCustomer,
    error,
  } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => Customers.getCustomer(id),
    enabled: !!id,
    retry: 1,
  });

  if (error) message.error(error.message);

  return { customer, isLoadingCustomer, isFetchingCustomer, error };
}
