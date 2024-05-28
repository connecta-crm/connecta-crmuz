import { useEffect, useState } from 'react';
import TeamModal from '../../ui/modal/TeamModal';
import TeamsTable from './TeamsTable';
import { useTeams } from './useTeam';
import { useTeamsDetails } from './useTeamDetails';
export default function Teams() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { team, isLoadingTeam } = useTeamsDetails(editId);
  const { teams, isLoading } = useTeams(true);
  console.log(teams);

  useEffect(() => {
    if (team) {
      setOpenModal(true);
    }
  }, [team]);

  return (
    <>
      <div className="teams">
        <TeamsTable
          setEditId={setEditId}
          setOpenModal={setOpenModal}
          dataSource={teams}
          isLoading={isLoading}
          isLoadingTeam={isLoadingTeam}
          count={teams?.length}
        />
        <TeamModal
          setEditId={setEditId}
          team={team}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
