import { useEffect, useState } from 'react';
import StatusModal from '../../ui/modal/StatusModal';
import StatusTable from './StatusTable';
import { useStatusDetails } from './useStatusDetails';
import { useStatus } from './useStatus';
export default function Status() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { status, isLoadingTeam } = useStatusDetails(editId);
  const { statuses, isLoading } = useStatus(true);

  useEffect(() => {
    if (status) {
      setOpenModal(true);
    }
  }, [status]);

  return (
    <>
      <div className="status">
        <StatusTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={statuses}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={statuses?.length}
        />
        <StatusModal
          setEditId={setEditId}
          status={status}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
