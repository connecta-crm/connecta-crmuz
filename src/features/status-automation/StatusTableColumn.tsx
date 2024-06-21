
export const StatusTableColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a className="table__id">{name}</a>,
  },
  {
    title: 'Email template',
    dataIndex: 'accountName',
  },
  {
    title: 'SMS template',
    dataIndex: 'accountUsername',
  },
  {
    title: 'Steps',
    dataIndex: 'accountUsername',
  },
  {
    title: 'Delays',
    dataIndex: 'accountUsername',
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
];
