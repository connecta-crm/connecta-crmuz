/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import LeadModal from '../../ui/modal/LeadModal';
import CustomerModal from './CustomerModal';
import CustomerTable from './CustomerTable';
import { useCustomers } from './useCostumers';

function Customers() {
  const [guid, setGuid] = useState<string | null>(null);
  const {
    customers,
    count,
    isLoading: isLoadingLeads,
  } = useCustomers(true, {});
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const { show, status, hideModal } = useModal();

  console.log('CUSTOMERS: ', customers);

  return (
    <div className="leads">
      <CustomerTable
        guid={guid}
        count={count}
        dataSource={customers}
        loadingList={isLoadingLeads}
        loadingItem={false}
        onOpenModal={setOpenCustomerModal}
      />

      <CustomerModal
        openModal={openCustomerModal}
        onOpenModal={setOpenCustomerModal}
      />

      {show && status === 'lead' && (
        <LeadModal openLeadModal={show} setOpenLeadModa={hideModal} />
      )}
    </div>
  );
}

export default Customers;
