import { useEffect, useState } from 'react';
import UserModal from '../../ui/modal/UserModal';
import UsersTable from './UsersTable';
import { useUserDetails } from './useUserDetails';
import { useUsers } from './useUsers';
export default function Users() {
  const [userId, setUserId] = useState<number | null>(null);
  const { user, isLoadingUser } = useUserDetails(userId);
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
          isLoadingUser={isLoadingUser}
          count={users?.length}
          setUserId={setUserId}
        />
        <UserModal
          user={user}
          setUserId={setUserId}
          openModal={openModal}
          setModal={setOpenModal}
        />
      </div>
    </>
  );
}
