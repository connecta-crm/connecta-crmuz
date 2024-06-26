import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Quotes from '../../services/quotes';
import { DEFAULT_LIMIT } from '../../utils/constants';

export type QuotesParamsType = {
  limit: number;
  offset: number;
  status: string;
  q: string;
  source?: string[];
  user?: string[];
};

export function useQuotes() {
  const [searchParams] = useSearchParams();

  const limit = !searchParams.get('limit')
    ? DEFAULT_LIMIT
    : Number(searchParams.get('limit'));

  const offset = !searchParams.get('offset')
    ? 1
    : Number(searchParams.get('offset'));
  // const calculatedOffset = offset - 1;

  const q = searchParams.get('q') || '';
  const status = searchParams.get('status') || 'quote';
  const sources = searchParams.getAll('source');
  const user = searchParams.getAll('user');

  const {
    data: { results: quotes, count, sumPrice } = {},
    isPending: isLoadingQuotes,
    error,
  } = useQuery({
    queryKey: ['quotes', limit, offset, sources, q, status, user],
    queryFn: () =>
      Quotes.getQuotes({ limit, offset, source: sources, q, status, user }),
  });
  return { quotes, count, sumPrice, isLoadingQuotes, error };
}
