import { useState } from 'react';
import TeamModal from '../../ui/modal/TeamModal';
import TeamsTable from './TeamsTable';
import { useTeams } from './useTeam';
export default function Teams() {
  const [openModal, setOpenModal] = useState(false);
  const { teams, isLoading } = useTeams(true);
  console.log(teams, 'teams');

  return (
    <>
      <div className="teams">
        <TeamsTable
          setOpenModal={setOpenModal}
          dataSource={teams}
          isLoading={isLoading}
          count={teams?.length}
        />
        <TeamModal openModal={openModal} setModal={setOpenModal} />
      </div>
    </>
  );
}
