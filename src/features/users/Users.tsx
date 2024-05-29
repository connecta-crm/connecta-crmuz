import { useEffect, useState } from 'react';
import UserModal from '../../ui/modal/UserModal';
import UsersTable from './UsersTable';
import { useUsers } from './useUsers';
import { UsersTableDataType } from './usersTableDataType';
export default function Users() {
  const [user, setUser] = useState<UsersTableDataType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { users, isLoading } = useUsers();

  useEffect(() => {
    if (user) {
      setOpenModal(true);
    }
  }, [user]);

  return (
    <>
      <div className="users">
        <UsersTable
          setOpenModal={setOpenModal}
          dataSource={users}
          isLoading={isLoading}
          count={users?.length}
          setUser={setUser}
        />
        <UserModal
          user={user}
          setUser={setUser}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
