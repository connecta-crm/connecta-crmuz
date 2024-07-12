import { SettingProvidersTableDataType } from './setttingProviderTableDataType';

export const ProvidersTableColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string, recored: SettingProvidersTableDataType) => (
      <a className="table__id">{name ? name : recored?.id}</a>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
  },

  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <span className={status == 'active' ? '' : 'status__active'}>
        {status=="active"?"Active":"Inactive"}
      </span>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (status: string) => (
      <span className={status == 'standard' ? '' : 'status__active'}>
        {status=="standard"&&"Standard"}
        {status=="exclusive"&&"Exclusive"}
      </span>
    ),
  },
  {
    title: 'Created by',
    dataIndex: 'createdAt',
  },
];
