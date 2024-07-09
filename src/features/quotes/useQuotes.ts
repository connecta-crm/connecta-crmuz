import { useQuery } from '@tanstack/react-query';
import { useGetSearchParams } from '../../hooks/useGetSearchParams';
import Quotes from '../../services/quotes';

export type QuotesParamsType = {
  limit: number;
  offset: number;
  status: string;
  q: string;
  source?: string[];
  user?: string[];
};

export function useQuotes() {
  const { limit, offset, q, status, sources, user } = useGetSearchParams();

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
