import { TeamUsersType } from './teamsTableDataType';

export const TeamTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a>{name}</a>,
  },
  {
    title: 'Users',
    dataIndex: 'users',
    render: (data: TeamUsersType[]) => (
      <div>
        {data?.length > 0 ? (
          <span className="user__count"> Total {data?.length}</span>
        ) : (
          <span className="user__empty">Empty</span>
        )}
        {data?.length > 0 &&
          data?.map((item, index) => {
            if (index < 8) {
              return (
                <span key={index} className="user__name">
                  {item?.firstName}
                </span>
              );
            }
            if (index == 8)
              return (
                <span key={index} className="user__name">
                  {data.length - 8}+
                </span>
              );
          })}
      </div>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <span className={status == 'active' ? '' : 'status__active'}>
        {status}
      </span>
    ),
  },
  {
    title: 'User created on',
    dataIndex: 'createdAt',
  },
];
