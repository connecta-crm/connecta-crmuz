import { useState } from 'react';
import UsersTable from './UsersTable';
import { useUsers } from './useUsers';
import UserModal from '../../ui/modal/UserModal';
export default function Users() {
    const [openModal,setOpenModal] = useState(false)
  const {users,isLoading} =   useUsers()
  console.log(users);
  
  return (
    <>
      <div className="users">
        <UsersTable
        setOpenModal={setOpenModal}
        dataSource={users}
        isLoading={isLoading}
        count={users?.length}
        />
        <UserModal
         openModal={openModal}
         setModal={setOpenModal}
        />
      </div>
    </>
  );
}
