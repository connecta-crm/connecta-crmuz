import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Quotes from '../../services/quotes';
import { DEFAULT_LIMIT } from '../../utils/constants';

export function useQuoteLogs(id: number) {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));

  const {
    data: { results: quoteLogs } = {},
    isPending: isLoadingQuoteLogs,
    isFetching: isFetchingQuoteLogs,
    error,
  } = useQuery({
    queryKey: ['quoteLogs', limit, offset, id],
    queryFn: () => Quotes.getQuoteLogs({ limit, offset, id }),
    enabled: !!id,
  });
  return { quoteLogs, isLoadingQuoteLogs, isFetchingQuoteLogs, error };
}
