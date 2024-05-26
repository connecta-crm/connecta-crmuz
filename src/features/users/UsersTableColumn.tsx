import { UsersTableDataType } from "./usersTableDataType";

export const UsersTableColumn = [
  {
    title: 'User name',
    dataIndex: 'username',
    render: (name: string,recored:UsersTableDataType) => <a>{name ? name : recored?.id}</a>,
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
    title: 'Team',
    dataIndex: 'team',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Position',
    dataIndex: 'positionName',
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    render: (status: string) => (
      <span className={status ? '' : 'status__active'}>
        {status ? 'active' : 'inactive'}
      </span>
    ),
  },
  {
    title: 'User created on',
    dataIndex: 'createdAt',
  },
];
