import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Customers from '../../services/customers';

export type CustomersParamsType = {
  limit?: number;
  offset?: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  q?: string | null;
};

export function useCustomers(
  enabled: boolean,
  { name, email, phone }: CustomersParamsType,
) {
  const { limit, offset, q, status } = useGetSearchParams();

  const {
    data: { results: customers, count } = {},
    isPending: isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['customers', name, email, phone, limit, offset, status, q],
    queryFn: () =>
      Customers.getCustomers({ name, email, phone, limit, offset, status, q }),
    enabled,
  });
  return { customers, isLoading, count, isFetching, error };
}
