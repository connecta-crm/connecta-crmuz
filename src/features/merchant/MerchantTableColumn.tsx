
export const MerchantTableColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a className="table__id">{name}</a>,
  },
  {
    title: 'Account name',
    dataIndex: '',
  },
  {
    title: 'User name',
    dataIndex: '',
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
    title: 'Type',
    dataIndex: 'merchantType',
  },
  {
    title: 'Created on',
    dataIndex: '',
  },
  {
    title: 'Created by',
    dataIndex: '',
  },
];
