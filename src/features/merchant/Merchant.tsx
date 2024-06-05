import { useEffect, useState } from 'react';
import {  useMerchant } from './useMerchant';
import { useMerchantDetails } from './useMerchantDetails';
import MerchantTable from './MerchantTable';
import MerchantModal from '../../ui/modal/MerchantModal';
export default function Merchant() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { merchant, isLoadingTeam } = useMerchantDetails(editId);
  const { merchants, isLoading } =useMerchant(true);

  useEffect(() => {
    if (merchant) {
      setOpenModal(true);
    }
  }, [merchant]);

  return (
    <>
      <div className="merchant">
        <MerchantTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={merchants}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={merchants?.length}
        />
        <MerchantModal
          setEditId={setEditId}
          merchant={merchant}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
