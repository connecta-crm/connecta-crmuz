import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useModal } from '../../context/ModalContext';
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
  const [openLeadModal, setOpenLeadModal] = useState(false);
  const { show, status, hideModal } = useModal();
  const { openDrawer } = useDrawerFeature();
  const dispatch = useAppDispatch();
  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  useEffect(() => {
    hideModal();
  }, []);

  useEffect(() => {
    if (!isLoadingLead && !error && guid && lead) {
      dispatch(setLeadData(lead));
      openDrawer();
    }
  }, [isLoadingLead, error, dispatch, guid, lead]);

  return (
    <div className="leads">
      <LeadTable
        guid={guid}
        count={count}
        sourceType="lead"
        dataSource={leads}
        loadingList={isLoadingLeads}
        loadingItem={isLoadingLead}
        onOpenModal={setOpenLeadModal}
        onOpenDrawer={handleOpenDrawer}
      />
      <LeadModal
        openLeadModal={openLeadModal}
        setOpenLeadModa={setOpenLeadModal}
      />
      {show && status === 'lead' && (
        <LeadModal openLeadModal={show} setOpenLeadModa={hideModal} />
      )}
      <DrawerApp
        sourceType="lead"
        dataSource={leads}
        loadingItem={isLoadingLead}
        onOpenDrawer={handleOpenDrawer}
      />
      <Filter />
    </div>
  );
}

export default Leads;
