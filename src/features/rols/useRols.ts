import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Rols from '../../services/rols';
export type RolsParamsType = {
  url?: string;
};

export function useRols(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: rols,
    isPending: isLoading,
    isFetching: isFetchingRole,
    error,
  } = useQuery({
    queryKey: ['rols', url],
    queryFn: () => Rols.getRols({ url }),
    enabled,
  });
  return { rols, isLoading, isFetchingRole, error };
}
