import { useEffect, useState } from 'react';
import { useDistributionDetails } from './useDistributionDetails';
import { useDistribution } from './useDistribution';
import DistributionTable from './DistributionTable';
import DistributionModal from '../../ui/modal/DistributionModal';
export default function Distribution() {
  const [distributionId, setDistributionId] = useState<number | null>(null);
  const { distribution, isLoadingUser } = useDistributionDetails(distributionId);
  const [openModal, setOpenModal] = useState(false);
  const { distributions, isLoading } = useDistribution();

  useEffect(() => {
    if (distribution) {
      setOpenModal(true);
    }
  }, [distribution]);

  return (
    <>
      <div className="distribution">
        <DistributionTable
          setOpenModal={setOpenModal}
          dataSource={distributions}
          isLoading={isLoading}
          isLoadingUser={isLoadingUser}
          count={distributions?.length}
          setDistributionId={setDistributionId}
        />
        <DistributionModal
          distribution={distribution}
          setDistributionId={setDistributionId}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
