export const CompanyTableColumn = [
  {
    title: 'Company name',
    dataIndex: 'name',
    render: (name: string) => <a className="table__id">{name}</a>,
  },
  {
    title: 'Mainline',
    dataIndex: 'mainline',
  },
  {
    title: 'Fax',
    dataIndex: 'fax',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
