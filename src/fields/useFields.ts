import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Fields from '../services/fields';
export type GroundParamsType = {
  url?: string;
};

export function useFields(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: fields,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['fields', url],
    queryFn: () => Fields.getFields({ url }),
    enabled,
  });

  return { fields, isLoading, error, isFetchingTeam };
}
