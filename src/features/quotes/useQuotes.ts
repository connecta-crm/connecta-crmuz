import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_LIMIT } from '../../utils/constants';
import Quotes from '../../services/quotes';

export type QuotesParamsType = {
  limit: number;
  offset: number;
  q: string;
  source?: string[];
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
  const sources = searchParams.getAll('source');

  const {
    data: { results: leads, count, sumPrice } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['quotes', limit, offset, sources, q],
    queryFn: () => Quotes.getQuotes({ limit, offset, source: sources, q }),
  });
  return { leads, count, sumPrice, isLoading, error };
}
