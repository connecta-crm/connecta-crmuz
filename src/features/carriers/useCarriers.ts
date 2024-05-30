import { useQuery } from '@tanstack/react-query';
import Carriers from '../../services/carriers';

export type CarriersParamsType = {
  status?: number;
  name?: string;
};

export function useCarriers(
  enabled: boolean,
  { status, name }: CarriersParamsType,
) {
  const {
    data: carriers,
    isPending: isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['carriers', status, name],
    queryFn: () => Carriers.getCarriers({ status, name }),
    enabled,
  });
  return { carriers, isLoading, isFetching, error };
}
