import { useQuery } from '@tanstack/react-query';
import Leads from '../../services/leads';
import { SourceType } from '../../ui/Drawer';

export function useCDPrice(
  feature: SourceType,
  guid: string | null,
  enabled: boolean,
) {
  const {
    data: cdPrice,
    isPending: isLoading,
    isFetching: isFetchingCDPrice,
    error,
  } = useQuery({
    queryKey: ['cdPrice', guid],
    queryFn: () => Leads.getCDPrice(feature, guid),
    enabled,
    retry: 1,
  });

  return { cdPrice, isLoading, isFetchingCDPrice, error };
}
