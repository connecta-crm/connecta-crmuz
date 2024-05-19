import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useModal } from '../../context/ModalContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import LeadModal from '../../ui/modal/LeadModal';
import QuotesModal from '../../ui/modal/QuotesModal';
import { setLeadData } from '../leads/leadSlice';
import QuotesTable from './QuotesTable';
import { useQuote } from './useQuote';
import { useQuotes } from './useQuotes';
function Quotes() {
  const [guid, setGuid] = useState<string | null>(null);
  const { quotes, count, isLoadingQuotes } = useQuotes();
  const { quote, isLoading: isLoadingQuote, error } = useQuote(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);
  console.log(openLeadModal);

  const { openDrawer } = useDrawerFeature();

  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  useEffect(() => {
    if (!isLoadingQuote && !error && guid && quote) {
      dispatch(setLeadData(quote));
      openDrawer();
    }
  }, [isLoadingQuote, error, dispatch, guid, quote]);

  const { show, status, hideModal } = useModal();

  return (
    <div className="quotes">
      <QuotesTable
        sourceType="quote"
        guid={guid}
        count={count}
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
      {show && status === 'lead' && (
        <LeadModal openLeadModal={show} setOpenLeadModa={hideModal} />
      )}

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
