import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Carriers from '../../services/carriers';
import { DEFAULT_LIMIT } from '../../utils/constants';

export type CarriersParamsType = {
  limit?: number;
  offset?: number;
  name?: string | null;
  status?: string | null;
  q?: string | null;
};

export function useCarriers(enabled: boolean, { name }: CarriersParamsType) {
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status') || '';
  const q = searchParams.get('q') || '';

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));

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
