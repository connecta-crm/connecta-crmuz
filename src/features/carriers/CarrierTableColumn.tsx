import { CarrierDataType } from './CarrierTableColumnType';

export const CarrierTableColumn = [
  {
    title: 'Company name',
    dataIndex: 'name',
    render: (item: string, row: CarrierDataType) => (
      <div className="font-bold table__id" style={{ color: '#086ed6' }}>
        {item} {row.name}
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
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
  },
  {
    title: 'Ongoing',
    dataIndex: 'ongoing',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Owe',
    dataIndex: 'owe',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (item: 'active' | 'inactive' | 'favorite' | 'blocked') => (
      <span
        style={{
          color:
            item === 'active'
              ? '#086ed6'
              : item === 'inactive' || item === 'blocked'
                ? '#e52e2e'
                : item === 'favorite'
                  ? '#088f8f'
                  : '#000000',
        }}
      >
        {item === 'active'
          ? 'Active'
          : item === 'inactive'
            ? 'Inactive'
            : item === 'favorite'
              ? 'Favorite'
              : item === 'blocked'
                ? 'Blocked'
                : 'Unknown'}
      </span>
    ),
  },
  {
    title: 'Added',
    dataIndex: 'added',
  },
];
