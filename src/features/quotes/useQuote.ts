import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import Quotes from '../../services/quotes';

export function useQuote(guid: string | null) {
  const {
    data: quote,
    isPending: isLoading,
    isFetching: isFetchingQuote,
    error,
  } = useQuery({
    queryKey: ['quote', guid],
    queryFn: () => Quotes.getQuote(guid),
    enabled: !!guid,
    retry: 1,
  });

  if (error) message.error(error.message);

  return { quote, isLoading, isFetchingQuote, error };
}
