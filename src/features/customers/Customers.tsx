/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import { useAppDispatch } from '../../store/hooks';
import DrawerApp from '../../ui/Drawer';
import CustomerModal from './CustomerModal';
import CustomerTable from './CustomerTable';
import { setCustomerData } from './customerSlice';
import { useCustomers } from './useCostumers';
import { useCustomer } from './useCustomer';

function Customers() {
  useSetStatusParam('all_customers');
  const [customerId, setCustomerId] = useState<number | string | null>(null);
  const [openCustomerModal, setOpenCustomerModal] = useState(false);
  const [isOpenHistoryModal, setOpenHistoryModal] = useState(false);

  const { openDrawer } = useDrawerFeature();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const {
    customers,
    count,
    isLoading: isLoadingCustomers,
  } = useCustomers(true, {});

  const { customer, isLoadingCustomer, error } = useCustomer(customerId);
  // const {
  //   quoteLogs: customerLogs,
  //   isLoadingQuoteLogs: isLoadingCustomerLogs,
  //   isFetchingQuoteLogs,
  // } = useQuoteLogs(customerId); // todo

  const handleOpenDrawer = (id: number | string | null) => {
    setCustomerId(null);
    console.log('set', id);
    setTimeout(() => setCustomerId(id), 0);
  };

  const handleOpenHistoryModal = (id: number) => {
    setCustomerId(0);
    setTimeout(() => setCustomerId(id), 0);
  };

  // useEffect(() => {
  //   if (!isLoadingCustomerLogs && customerId) {
  //     setOpenHistoryModal(true);
  //   }
  // }, [isLoadingCustomerLogs, customerId]);

  useEffect(() => {
    if (!isLoadingCustomer && !error && customerId && customer) {
      dispatch(setCustomerData(customer)); // todo
      openDrawer();
      setTimeout(
        () =>
          queryClient.invalidateQueries({ queryKey: [`customerAttachments`] }),
        0,
      );
    }
  }, [isLoadingCustomer, error, dispatch, customerId, customer]);

  console.log('CUSTOMERS: ', customers);

  return (
    <div className="customers">
      <CustomerTable
        guid={customerId}
        count={count}
        dataSource={customers}
        loadingList={isLoadingCustomers}
        loadingItem={isLoadingCustomer}
        onOpenModal={setOpenCustomerModal}
        onOpenDrawer={handleOpenDrawer}
      />

      <CustomerModal
        openModal={openCustomerModal}
        onOpenModal={setOpenCustomerModal}
      />
      <DrawerApp
        sourceType="customer"
        dataSource={customers}
        loadingItem={isLoadingCustomer}
        // isLoadingHistory={isFetchingQuoteLogs} // todo
        onOpenDrawer={handleOpenDrawer}
        onOpenHistory={handleOpenHistoryModal}
      />
    </div>
  );
}

export default Customers;
