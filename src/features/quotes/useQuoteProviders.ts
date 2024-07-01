import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Quotes from '../../services/quotes';

export function useQuoteProviders(enabled: boolean) {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || '';

  const {
    data: quoteProviders,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['quoteProviders', status],
    queryFn: () => Quotes.getQuoteProviders(status),
    enabled,
  });
  return { quoteProviders, isLoading, error };
}
