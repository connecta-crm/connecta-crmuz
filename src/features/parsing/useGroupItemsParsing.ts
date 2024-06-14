import { useQuery } from '@tanstack/react-query';
import Parsing from '../../services/parsing';
export type GroundParamsType = {
  url?: string;
};

export function useGroupItemsParsing(enabled: boolean,id:string) {

  const {
    data: groupItems,
    isPending: isLoading,
    isFetching: isFetchingGroupItem,
    error,
  } = useQuery({
    queryKey: ['group-item-parsing',id],
    queryFn: () => Parsing.getGroupItemsParsing({ id }),
    enabled,
  });

  return { groupItems, isLoading, error, isFetchingGroupItem };
}
