import { useEffect, useState } from 'react';
import GroundTable from './GroundTable';
import { useGround } from './useGround';
import { useGroundDetails } from './useGroundDetails';
import GroundModal from '../../ui/modal/GroundModal';
export default function Ground() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { groundItem, isLoadingTeam } = useGroundDetails(editId);
  const { ground, isLoading } = useGround(true);

  useEffect(() => {
    if (groundItem) {
      setOpenModal(true);
    }
  }, [groundItem]);

  return (
    <>
      <div className="ground">
        <GroundTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={ground}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={ground?.length}
        />
        <GroundModal
          setEditId={setEditId}
          groundItem={groundItem}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
