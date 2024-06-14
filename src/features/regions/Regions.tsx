import { useEffect, useState } from 'react';
import RegionsTable from './RegionsTable';
import { useRegions } from './useRegions';
import { useRegionDetails } from './useRegionDetails';
import RegionsModal from '../../ui/modal/RegionsModal';
export default function Regions() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { region, isLoadingTeam } = useRegionDetails(editId);
  const { regions, isLoading } = useRegions(true);

  useEffect(() => {
    if (region) {
      setOpenModal(true);
    }
  }, [region]);

  return (
    <>
      <div className="regions">
        <RegionsTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={regions}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={regions?.length}
        />
        <RegionsModal
          setEditId={setEditId}
          region={region}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
