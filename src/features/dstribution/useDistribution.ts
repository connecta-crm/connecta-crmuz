import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Distribution from '../../services/distribution';
export type UsersParamsType = {
  url?: string;
};

export function useDistribution() {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data:distributions,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['distributions', url],
    queryFn: () => Distribution.getDistributions({ url }),
  });
  return { distributions, isLoading, error };
}
