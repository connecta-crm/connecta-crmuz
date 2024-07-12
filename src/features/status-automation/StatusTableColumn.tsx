
export const StatusTableColumn = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a className="table__id">{name}</a>,
  },
  {
    title: 'Email template',
    dataIndex: 'emailTemplateName',
  },
  {
    title: 'SMS template',
    dataIndex: 'smsTemplateName',
  },
  {
    title: 'Steps',
    dataIndex: 'steps',
    render: (delay: string) => (
      <>
      {delay=="after_received"&&"After received"}
      {delay=="after_quoted"&&"After quoted"}
      {delay=="after_dispatch"&&"After dispatch"}
      {delay=="after_pickup"&&"After pick up"}
      {delay=="after_delivery"&&"After delivery"}
      {delay=="before_pickup"&&"Before pick up"}
      {delay=="before_delivery"&&"Before delivery"}
     </>
    ),
  },
  {
    title: 'Gap',
    dataIndex: 'delaysMinutes',
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
];
