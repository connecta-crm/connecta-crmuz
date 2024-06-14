import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Parsing from '../../services/parsing';
export type GroundParamsType = {
  url?: string;
};

export function useGroupParsing(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const url = searchParams.size > 0 ? searchParams.toString() : '';

  const {
    data: groups,
    isPending: isLoading,
    isFetching: isFetchingGroup,
    error,
  } = useQuery({
    queryKey: ['group-parsing', url],
    queryFn: () => Parsing.getGroupParsing({ url }),
    enabled,
  });

  return { groups, isLoading, error, isFetchingGroup };
}
