import { useState } from 'react';
import RoleModal from '../../ui/modal/RoleModal';
import RolsTable from './RolsTable';
import { useRols } from './useRols';
export default function Rols() {
  const [openModal, setOpenModal] = useState(false);
  const { rols, isLoading } = useRols(true);

  return (
    <>
      <div className="rols">
        <RolsTable
          setOpenModal={setOpenModal}
          dataSource={rols}
          isLoading={isLoading}
          count={rols?.length}
        />
        <RoleModal openModal={openModal} setModal={setOpenModal} />
      </div>
    </>
  );
}
