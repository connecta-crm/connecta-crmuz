/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useSetStatusParam } from '../../hooks/useSetStatusParam';
import CarrierModal from './CarrierModal';
import CarrierTable from './CarrierTable';
import { useCarriers } from './useCarriers';

function Carriers() {
  useSetStatusParam('all');
  const [openCarrierModal, setOpenCarrierModal] = useState(false);

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
