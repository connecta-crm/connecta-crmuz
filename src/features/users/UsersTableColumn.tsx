import { UsersTableDataType } from './usersTableDataType';

export const UsersTableColumn = [
  {
    title: 'Email',
    dataIndex: 'email',
    render: (name: string, recored: UsersTableDataType) => (
      <a className="table__id">{name ? name : recored?.id}</a>
    ),
  },
  {
    title: 'First name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last name',
    dataIndex: 'lastName',
  },
  {
    title: 'Access role',
    dataIndex: 'accessRole',
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    render: (status: boolean) => (
      <span className={status ? '' : 'status__active'}>
        {status == true && 'Active'}
        {status == false && 'Inactive'}
      </span>
    ),
  },
  {
    title: 'User created on',
    dataIndex: 'createdAt',
  },
];
