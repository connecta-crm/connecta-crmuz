import { useQuery } from '@tanstack/react-query';
import Rols from '../../services/rols';

export function useFeature(enabled: boolean) {

  const {
    data: features,
    isPending: isLoading,
    isFetching: isFetchingRole,
    error,
  } = useQuery({
    queryKey: ['feature'],
    queryFn: () => Rols.getFeature(),
    enabled,
  });
  return { features, isLoading, isFetchingRole, error };
}
