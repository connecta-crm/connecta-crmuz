import { useQuery } from '@tanstack/react-query';
import Carriers from '../../services/carriers';

export type CarriersParamsType = {
  status?: number;
};

export function useCarriers(enabled: boolean, { status }: CarriersParamsType) {
  const {
    data: { results: carriers } = {},
    isPending: isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['carriers', status],
    queryFn: () => Carriers.getCarriers({ status }),
    enabled,
  });
  return { carriers, isLoading, isFetching, error };
}
