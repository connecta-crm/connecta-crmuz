import { CustomerDataType } from './CustomerTableColumnType';

export const CustomerTableColumn = [
  {
    title: 'Customer',
    dataIndex: 'name',
    render: (item: string, row: CustomerDataType) => (
      <div className="font-bold" style={{ color: '#086ed6' }}>
        {item} {row.lastName}
      </div>
    ),
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    render: (text: string) => (
      <div className="table__phone">
        <img src="./img/dt_table/call.svg" alt="" />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Billing',
    dataIndex: 'billing',
  },
  {
    title: 'Completed	',
    dataIndex: 'completed',
  },
  {
    title: 'Ongoing',
    dataIndex: 'ongoing',
  },

  {
    title: 'Stage',
    dataIndex: 'stage',
  },
  {
    title: 'Source',
    dataIndex: 'source',
  },
  {
    title: 'Added',
    dataIndex: 'added',
  },
];
