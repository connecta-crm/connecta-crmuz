/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useModal } from '../../context/ModalContext';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import QuoteHistoryModal from '../../ui/HistoryModal';
import QuotesCDPriceModal from '../../ui/modal/CDPriceModal';
import LeadModal from '../../ui/modal/LeadModal';
import QuotesModal from '../../ui/modal/QuotesModal';
import { useCDPrice } from '../leads/useCDPrice';
import QuotesTable from './QuoteTable';
import QuotesConvertModal from './QuotesConvertModal';
import { setQuoteData } from './quoteSlice';
import { useQuote } from './useQuote';
import { useQuoteLogs } from './useQuoteLogs';
import { useQuotes } from './useQuotes';
import { useQuoteCreateCDPrice } from './useQuoteCreateCDPrice';
import { message } from 'antd';
export type createCdPriceType = {
  originZip: string;
  destinationZip: string;
  trailerType: string;
  vehicleType: string;
  vehiclesLength: string;
  vehicleYear: string;
};
function Quotes() {
  useSetStatusParam('quote');
  const [guid, setGuid] = useState<string | null>(null);
  const [quoteId, setQuoteId] = useState<number>(0);
  const [isOpenHistoryModal, setOpenHistoryModal] = useState(false);
  const [isOpenConvertModal, setOpenConvertModal] = useState(false);
  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [quoteCdPrice, setQuoteCdPrice] = useState(null);

  const [quoteCdData, setQuoteCdData] = useState<createCdPriceType>({
    originZip: '',
    destinationZip: '',
    trailerType: '',
    vehicleType: '',
    vehiclesLength: '',
    vehicleYear: '',
  });

  const { quotes, count, isLoadingQuotes } = useQuotes();
  const { quote, isLoading: isLoadingQuote, error } = useQuote(guid);
  const { quoteLogs, isLoadingQuoteLogs, isFetchingQuoteLogs } =
    useQuoteLogs(quoteId);
  const [isOpenCDPriceModal, setOpenCDPriceModal] = useState(false);

  const { cdPrice, isFetchingCDPrice } = useCDPrice(
    'quote',
    guid,
    quoteCdPrice ? false : isOpenCDPriceModal,
  );

  const { createCdPrice, isLoadingQuoteCdPrice } = useQuoteCreateCDPrice();

  const postQuoteCDPrice = () => {
    let errorText = '';
    for (const key in quoteCdData) {
      if (Object.prototype.hasOwnProperty.call(quoteCdData, key)) {
        if (!quoteCdData[key as keyof createCdPriceType]) {
          errorText += key + ' , ';
        }
      }
    }
    if (errorText) {
      message.error(errorText + 'required ! ');
      return;
    }

    createCdPrice(quoteCdData, {
      onSuccess(data) {
        setQuoteCdPrice(data);
        setOpenCDPriceModal(true);
      },
    });
  };

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
    if (!openLeadModal) {
      setQuoteCdPrice(null);
    }
  }, [openLeadModal]);

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
        setQuoteCdData={setQuoteCdData}
        quoteCdData={quoteCdData}
        isFetchingCDPrice={isLoadingQuoteCdPrice}
        postQuoteCDPrice={postQuoteCDPrice}
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
      />
      <QuotesConvertModal
        isOpenModal={isOpenConvertModal}
        onOpenModal={setOpenConvertModal}
      />
      <QuotesCDPriceModal
        cdPrice={quoteCdPrice || cdPrice}
        isFetchingCDPrice={isFetchingCDPrice || isLoadingQuoteCdPrice}
        isOpenModal={isOpenCDPriceModal}
        onOpenModal={setOpenCDPriceModal}
      />

      {show && status === 'lead' && (
        <LeadModal openLeadModal={show} setOpenLeadModa={hideModal} />
      )}

      <DrawerApp
        sourceType="quote"
        dataSource={quotes}
        loadingItem={isLoadingQuote}
        isLoadingHistory={isFetchingQuoteLogs}
        onOpenDrawer={handleOpenDrawer}
        onOpenHistory={handleOpenHistoryModal}
        onOpenConvert={handleOpenConvertModal}
      />
    </div>
  );
}

export default Quotes;
