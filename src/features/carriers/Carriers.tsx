/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import CarrierTable from './CarrierTable';
import { useCarriers } from './useCarriers';

function Carriers() {
  useSetStatusParam('all');
  const [openCustomerModal, setOpenCustomerModal] = useState(false);

  // const { openDrawer } = useDrawerFeature();
  // const dispatch = useAppDispatch();
  // const queryClient = useQueryClient();

  const { carriers, isLoading: isLoadingCarriers } = useCarriers(true, {});

  console.log('CARRIERS: ', carriers);

  return (
    <div className="carriers">
      <CarrierTable
        guid={null}
        count={0}
        dataSource={carriers}
        loadingList={isLoadingCarriers}
        loadingItem={false}
        onOpenModal={setOpenCustomerModal}
        // onOpenDrawer={handleOpenDrawer}
      />

      {/* <CustomerModal
        openModal={openCustomerModal}
        onOpenModal={setOpenCustomerModal}
      /> */}
      {/* <DrawerApp
        sourceType="customer"
        dataSource={customers}
        loadingItem={isLoadingCustomer}
        // isLoadingHistory={isFetchingQuoteLogs} // todo
        onOpenDrawer={handleOpenDrawer}
        onOpenHistory={handleOpenHistoryModal}
      /> */}
    </div>
  );
}

export default Carriers;
