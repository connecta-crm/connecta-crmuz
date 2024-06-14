import { useEffect, useState } from 'react';
import RoleModal from '../../ui/modal/RoleModal';
import RolsTable from './RolsTable';
import { useRoleDetails } from './useRoleDetails';
import { useRols } from './useRols';
export default function Rols() {
  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const { role, isLoadingRole } = useRoleDetails(editId);
  const { rols, isLoading } = useRols(true);

  useEffect(() => {
    if (role) {
      setOpenModal(true);
    }
  }, [role]);

  return (
    <>
      <div className="rols">
        <RolsTable
          setOpenModal={setOpenModal}
          dataSource={rols}
          isLoading={isLoading}
          setEditId={setEditId}
          isLoadingRole={isLoadingRole}
          count={rols?.length}
        />
        <RoleModal
          setEditId={setEditId}
          role={role}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
