import { useEffect, useState } from 'react';
import { useVoipDetails } from './useVoipDetails';
import VoipModal from '../../ui/modal/VoipModal';
import VoipTable from './VoipTable';
import { useVoip } from './useVoip';
export default function Voip() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { voip, isLoadingTeam } = useVoipDetails(editId);
  const { voips, isLoading } = useVoip(true);

  useEffect(() => {
    if (voip) {
      setOpenModal(true);
    }
  }, [voip]);

  return (
    <>
      <div className="voip">
        <VoipTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={voips}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={voips?.length}
        />
        <VoipModal
          setEditId={setEditId}
          voip={voip}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
