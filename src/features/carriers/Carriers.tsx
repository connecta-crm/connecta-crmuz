/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import CarrierModal from './CarrierModal';
import CarrierTable from './CarrierTable';
import { useCarriers } from './useCarriers';

function Carriers() {
  const [openCarrierModal, setOpenCarrierModal] = useState(false);

  const { carriers, isLoading: isLoadingCarriers } = useCarriers(true, {});

  return (
    <div className="carriers">
      <CarrierTable
        guid={null}
        count={0}
        dataSource={carriers}
        loadingList={isLoadingCarriers}
        loadingItem={false}
        onOpenModal={setOpenCarrierModal}
      />
      <CarrierModal
        openModal={openCarrierModal}
        onOpenModal={setOpenCarrierModal}
      />
    </div>
  );
}

export default Carriers;
