import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useModal } from '../../context/ModalContext';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import LeadHistoryModal from '../../ui/HistoryModal';
import LeadModal from '../../ui/modal/LeadModal';
import LeadTable from './LeadTable';
import { setLeadData } from './leadSlice';
import { useLead } from './useLead';
import { useLeadLogs } from './useLeadLogs';
import { useLeads } from './useLeads';

function Leads() {
  const [guid, setGuid] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<number>(0);
  const { leads, count, isLoading: isLoadingLeads } = useLeads();
  const { lead, isLoading: isLoadingLead, error } = useLead(guid);
  const { leadLogs, isLoadingLeadLogs } = useLeadLogs(leadId);

  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [isOpenHistoryModal, setOpenHistoryModal] = useState(false);

  const { show, status, hideModal } = useModal();
  const { openDrawer } = useDrawerFeature();

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const handleOpenDrawer = (guid: string | null) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  const handleOpenHistoryModal = (id: number) => {
    setLeadId(0);
    setTimeout(() => setLeadId(id), 0);
  };

  useEffect(() => {
    if (!isLoadingLeadLogs && leadId) {
      setOpenHistoryModal(true);
    }
  }, [isLoadingLeadLogs, leadId]);

  useEffect(() => {
    if (!isLoadingLead && !error && guid && lead) {
      dispatch(setLeadData(lead));
      openDrawer();
      setTimeout(
        () => queryClient.invalidateQueries({ queryKey: [`leadAttachments`] }),
        0,
      );
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
      <LeadHistoryModal
        historyLogs={leadLogs}
        isOpenModal={isOpenHistoryModal}
        onOpenModal={setOpenHistoryModal}
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
        onOpenHistory={handleOpenHistoryModal}
      />
      {/* <Filter /> */}
    </div>
  );
}

export default Leads;
