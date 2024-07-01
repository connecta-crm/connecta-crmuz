import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Customers from '../../services/customers';
import { DEFAULT_LIMIT } from '../../utils/constants';

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
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status') || '';
  const q = searchParams.get('q') || '';

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));
  // const calculatedOffset = offset - 1;

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
