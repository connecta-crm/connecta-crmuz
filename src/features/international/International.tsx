import { useEffect, useState } from 'react';
import {useInternational } from './useInternational';
import { useInternationalDetails } from './useInternationalDetails';
import InternationalTable from './InternationalTable';
import InternationalModal from '../../ui/modal/InternationalModal';
export default function International() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { international, isLoadingTeam } = useInternationalDetails(editId);
  const { internationals, isLoading } = useInternational(true);

  useEffect(() => {
    if (international) {
      setOpenModal(true);
    }
  }, [international]);

  return (
    <>
      <div className="international">
        <InternationalTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={internationals}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={internationals?.length}
        />
        <InternationalModal
          setEditId={setEditId}
          international={international}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
