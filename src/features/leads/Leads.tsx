import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import Filter from '../../ui/filter/Filter';
import LeadModal from '../../ui/modal/LeadModal';
import LeadTable from './LeadTable';
import { setLeadData } from './leadSlice';
import { useLead } from './useLead';
import { useLeads } from './useLeads';

function Leads() {
  const [guid, setGuid] = useState<string | null>(null);
  const { leads, count, isLoading: isLoadingLeads } = useLeads();
  const { lead, isLoading: isLoadingLead, error } = useLead(guid);

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
      console.log('setLeadData Lead 1');
    }
  }, [isLoadingLead, error, dispatch, guid, lead]);

  return (
    <div className="leads">
      <LeadTable
        guid={guid}
        count={count}
        leads={leads}
        isLoadingLeads={isLoadingLeads}
        isLoadingLead={isLoadingLead}
        onOpenDrawer={handleOpenDrawer}
      />
      <LeadModal />
      <DrawerApp
        leads={leads}
        isLoadingLead={isLoadingLead}
        onOpenDrawer={handleOpenDrawer}
      />
      <Filter />
    </div>
  );
}

export default Leads;
