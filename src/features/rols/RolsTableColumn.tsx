import { RolsTableDataType } from "./rolsTableDataType";

export const RolsTableColumns = [
  {
    title: 'Name',
    dataIndex: 'accessName',
    render: (name: string) => <a className="table__id">{name}</a>,
  },
  {
    title: 'Users',
    dataIndex: 'accessUsers',
    render: (data: RolsTableDataType[]) => (
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
    dataIndex: 'accessStatus',
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
