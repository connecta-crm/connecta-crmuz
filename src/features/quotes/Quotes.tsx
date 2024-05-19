import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import QuotesModal from '../../ui/modal/QuotesModal';
import QuotesTable from './QuoteTable';
import { setQuoteData } from './quoteSlice';
import { useQuote } from './useQuote';
import { useQuotes } from './useQuotes';

function Quotes() {
  const [guid, setGuid] = useState<string | null>(null);
  const { quotes, count, isLoadingQuotes } = useQuotes();
  const { quote, isLoading: isLoadingQuote, error } = useQuote(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);

  const { openDrawer } = useDrawerFeature();

  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  useEffect(() => {
    if (!isLoadingQuote && !error && guid && quote) {
      dispatch(setQuoteData(quote));
      console.log('quote: ', quote);
      openDrawer();
    }
  }, [isLoadingQuote, error, dispatch, guid, quote]);

  return (
    <div className="quotes">
      <QuotesTable
        guid={guid}
        count={count}
        sourceType="quote"
        dataSource={quotes}
        loadingList={isLoadingQuotes}
        loadingItem={isLoadingQuote}
        onOpenModal={setOpenLeadModal}
        onOpenDrawer={handleOpenDrawer}
      />
      <QuotesModal
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
      />
      <DrawerApp
        sourceType="quote"
        dataSource={quotes}
        loadingItem={isLoadingQuote}
        onOpenDrawer={handleOpenDrawer}
      />
    </div>
  );
}

export default Quotes;
