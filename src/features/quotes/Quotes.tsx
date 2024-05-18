import { useState } from 'react';
import QuotesTable from './QuoteTable';
import { useQuotes } from './useQuotes';

function Quotes() {
  const [guid, setGuid] = useState<string | null>(null);
  const { quotes, count, isLoadingQuotes } = useQuotes();
  const { lead, isLoading: isLoadingLead, error } = useLead(guid);
  const [openLeadModal, setOpenLeadModal] = useState(false);

  const { openDrawer } = useDrawerFeature();

  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  useEffect(() => {
    if (!isLoadingLead && !error && guid && lead) {
      dispatch(setLeadData(lead));
      openDrawer();
    }
  }, [isLoadingLead, error, dispatch, guid, lead]);

  return (
    <div className="quotes">
      <QuotesTable
        guid={guid}
        count={count}
        leads={quotes}
        isLoadingLeads={isLoadingLeads}
        isLoadingLead={isLoadingLead}
        onOpenDrawer={handleOpenDrawer}
      />
      {/* <QuoteModal openLeadModal={openLeadModal} setOpenLeadModa={setOpenLeadModal}  /> */}
      <DrawerApp
        leads={leads}
        isLoadingLead={isLoadingLead}
        onOpenDrawer={handleOpenDrawer}
      />
      <Filter />
    </div>
  );
}

export default Quotes;
