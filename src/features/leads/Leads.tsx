import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
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
    if (!isLoadingLead && !error) {
      dispatch(setLeadData(lead));
      openDrawer();
    }
  }, [isLoadingLead, error, dispatch]);

  useEffect(() => {
    if (!isLoadingLeads && leads.length && lead && Object.keys(lead)?.length) {
      dispatch(setLeadData(lead));
    }
  }, [leads, lead, dispatch, isLoadingLeads]);

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
    </div>
  );
}

export default Leads;
