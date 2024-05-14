import { useQuery } from '@tanstack/react-query';
import Customers from '../../services/customers';

export type CustomersParamsType = {
  limit?: number;
  offset?: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

export function useCustomers(
  enabled: boolean,
  { name, email, phone }: CustomersParamsType,
) {
  // const [searchParams] = useSearchParams();

  // const limit = !searchParams.get('limit')
  //   ? DEFAULT_LIMIT
  //   : Number(searchParams.get('limit'));

  // const offset = !searchParams.get('offset')
  //   ? 1
  //   : Number(searchParams.get('offset'));
  // const calculatedOffset = offset - 1;

  const {
    data: { results: customers } = {},
    isPending: isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['customers', name, email, phone],
    queryFn: () => Customers.getCustomers({ name, email, phone }),
    enabled,
  });
  return { customers, isLoading, isFetching, error };
}
