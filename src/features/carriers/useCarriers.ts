import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Carriers from '../../services/carriers';

export type CarriersParamsType = {
  limit?: number;
  offset?: number;
  name?: string | null;
  status?: string | null;
  q?: string | null;
};

export function useCarriers(enabled: boolean, { name }: CarriersParamsType) {
  const { limit, offset, q, status } = useGetSearchParams();

  const {
    data: carriers,
    isPending: isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['carriers', name, limit, offset, status, q],
    queryFn: () => Carriers.getCarriers({ name, limit, offset, status, q }),
    enabled,
  });
  return { carriers, isLoading, isFetching, error };
}
