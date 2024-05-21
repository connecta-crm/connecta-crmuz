import { useQuery } from '@tanstack/react-query';
import Quotes from '../../services/quotes';
import { useAppSelector } from '../../store/hooks';
import { getQuoteData } from './quoteSlice';

export function useQuoteAttachments() {
  const { id } = useAppSelector(getQuoteData);
  const {
    data: { results: quoteAttachments, count } = {},
    isPending: isLoadingQuoteAttachments,
    error,
  } = useQuery({
    queryKey: ['quoteAttachments'],
    queryFn: () => Quotes.getQuoteAttachments(id),
    retry: false,
  });
  return { quoteAttachments, count, isLoadingQuoteAttachments, error };
}
