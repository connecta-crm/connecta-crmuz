
export const TemplatesTableColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a className="table__id">{name}</a>,
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
    dataIndex: 'templateType',
  },
  {
    title: 'Created on',
    dataIndex: 'createdAt',
  },
  {
    title: 'Created by',
    dataIndex: 'createdByEmail',
  },
];
