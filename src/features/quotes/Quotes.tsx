/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useModal } from '../../context/ModalContext';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import QuoteHistoryModal from '../../ui/HistoryModal';
import LeadModal from '../../ui/modal/LeadModal';
import QuotesModal from '../../ui/modal/QuotesModal';
import QuotesTable from './QuoteTable';
import QuotesConvertModal from './QuotesConvertModal';
import { setQuoteData } from './quoteSlice';
import { useQuote } from './useQuote';
import { useQuoteLogs } from './useQuoteLogs';
import { useQuotes } from './useQuotes';

function Quotes() {
  useSetStatusParam('quote');
  const [guid, setGuid] = useState<string | null>(null);
  const [quoteId, setQuoteId] = useState<number>(0);
  const [isOpenHistoryModal, setOpenHistoryModal] = useState(false);
  const [isOpenConvertModal, setOpenConvertModal] = useState(false);
  const [openLeadModal, setOpenLeadModal] = useState(false);

  const { quotes, count, isLoadingQuotes } = useQuotes();
  const { quote, isLoading: isLoadingQuote, error } = useQuote(guid);
  const { quoteLogs, isLoadingQuoteLogs } = useQuoteLogs(quoteId);

  const { openDrawer } = useDrawerFeature();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  const handleOpenHistoryModal = (id: number) => {
    setQuoteId(0);
    setTimeout(() => setQuoteId(id), 0);
  };

  const handleOpenConvertModal = () => {
    setOpenConvertModal(true);
  };

  useEffect(() => {
    if (!isLoadingQuoteLogs && quoteId) {
      setOpenHistoryModal(true);
    }
  }, [isLoadingQuoteLogs, quoteId]);

  useEffect(() => {
    if (!isLoadingQuote && !error && guid && quote) {
      dispatch(setQuoteData(quote));
      openDrawer();
      setTimeout(
        () => queryClient.invalidateQueries({ queryKey: [`quoteAttachments`] }),
        0,
      );
    }
  }, [isLoadingQuote, error, dispatch, guid, quote]);

  const { show, status, hideModal } = useModal();

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
      <QuoteHistoryModal
        historyLogs={quoteLogs}
        isOpenModal={isOpenHistoryModal}
        onOpenModal={setOpenHistoryModal}
      />
      <QuotesModal
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
      />
      <QuotesConvertModal
        isOpenModal={isOpenConvertModal}
        onOpenModal={setOpenConvertModal}
      />

      {show && status === 'lead' && (
        <LeadModal openLeadModal={show} setOpenLeadModa={hideModal} />
      )}

      <DrawerApp
        sourceType="quote"
        dataSource={quotes}
        loadingItem={isLoadingQuote}
        onOpenDrawer={handleOpenDrawer}
        onOpenHistory={handleOpenHistoryModal}
        onOpenConvert={handleOpenConvertModal}
      />
    </div>
  );
}

export default Quotes;
