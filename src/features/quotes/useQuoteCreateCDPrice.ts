import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import Quote from '../../services/quotes';
import { createCdPriceType } from './Quotes';
export function useQuoteCreateCDPrice() {

  const {
    mutate: createCdPrice,
    isPending: isLoadingQuoteCdPrice,
    isSuccess,
  } = useMutation({
    mutationFn: (item: createCdPriceType) => Quote.createQuoteCdPrice(item),
    onError: (err) => {
      message.error(err.message);
    },
  });
  return { createCdPrice, isLoadingQuoteCdPrice, isSuccess };
}
