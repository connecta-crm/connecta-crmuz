import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Parsing from '../../services/parsing';
export type GroundParamsType = {
  url?: string;
};

export function useParsing(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: parsings,
    isPending: isLoading,
    isFetching: isFetchingTeam,
    error,
  } = useQuery({
    queryKey: ['parsing', url],
    queryFn: () => Parsing.getParsing({ url }),
    enabled,
  });

  return { parsings, isLoading, error, isFetchingTeam };
}
