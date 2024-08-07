import RadioButton from '../ui/form/RadioButton';
// import TableDropdown from '../ui/TableDropdown';
// =======quotes==========

// =======contact==========

export const ContactTableData = [
  {
    key: '1',
    customer: 'Ali Brian',
    phone: '(999) 999-9999',
    email: 'yourname@gmail.com',
    billing: '65-34 Myrtle Ave #2f, Queens, NY 11385',
    completed: '20',
    ongoing: '20',
    stage: 'Quote',
    source: 'Referral',
    added: '01/21/2024 09:02 AM',
  },
  {
    key: '2',
    customer: 'Ali Brian',
    phone: '(999) 999-9999',
    email: 'yourname@gmail.com',
    billing: '65-34 Myrtle Ave #2f, Queens, NY 11385',
    completed: '20',
    ongoing: '20',
    stage: 'Quote',
    source: 'Referral',
    added: '01/21/2024 09:02 AM',
  },
  {
    key: '3',
    customer: 'Ali Brian',
    phone: '(999) 999-9999',
    email: 'yourname@gmail.com',
    billing: '65-34 Myrtle Ave #2f, Queens, NY 11385',
    completed: '20',
    ongoing: '20',
    stage: 'Quote',
    source: 'Referral',
    added: '01/21/2024 09:02 AM',
  },
  {
    key: '4',
    customer: 'Ali Brian',
    phone: '(999) 999-9999',
    email: 'yourname@gmail.com',
    billing: '65-34 Myrtle Ave #2f, Queens, NY 11385',
    completed: '20',
    ongoing: '20',
    stage: 'Quote',
    source: 'Referral',
    added: '01/21/2024 09:02 AM',
  },
];

// =======task==========
export const TaskTableColumns = [
  {
    title: 'Done',
    dataIndex: 'done',
    render: (text: string) => <RadioButton item={text} />,
  },
  {
    title: 'Task ID',
    dataIndex: 'id',
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
  },
  {
    title: 'Task',
    dataIndex: 'task',
    render: () => (
      <a>
        <img
          src="./img/dt_table/task_phone.png"
          alt=""
          width="20px"
          height="20px"
        />
      </a>
    ),
  },
  {
    title: 'Title',
    dataIndex: 'text',
  },

  {
    title: 'Customer',
    dataIndex: 'customer',
    render: (customer: string) => <p>{customer}</p>,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    render: (text: string) => (
      <div className="table__phone">
        <img src="./img/dt_table/call.svg" alt="" width="20px" height="20px" />
        <span>{text}</span>
      </div>
    ),
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
  },
  {
    title: 'User',
    dataIndex: 'user',
    render: (name: string) => (
      <div
        className="table__img__container"
        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
      >
        <img
          src="./img/dt_table/default_user_image.png"
          alt=""
          className="table__user__img"
        />{' '}
        <span>{name}</span>{' '}
      </div>
    ),
  },
];

// * insight table fake column
export const InsightLeadsTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (text: string) => (
      <p className="font-bold" style={{ color: 'rgb(8, 110, 214)' }}>
        {text}
      </p>
    ),
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
  },
  {
    title: 'Comission',
    dataIndex: 'comission',
  },
  {
    title: 'User',
    dataIndex: 'user',
  },
  {
    title: 'Lead status',
    dataIndex: 'lead_status',
  },
  {
    title: 'Lead source',
    dataIndex: 'lead_source',
  },
  {
    title: 'Lead created on',
    dataIndex: 'lead_created',
  },
];

// * insight table fake data
export const InsightLeadsTableData = [
  {
    id: '110000',
    customer: 'John Smith',
    comission: 'John Smith',
    lead_status: 'Upcoming',
    user: 'Ali Brian',
    lead_source: 'A01',
    lead_created: '01/15/2024 09:02 AM',
  },
];

export const TaskTableData = [
  {
    key: '1',
    done: 'sssss',
    task_id: '10000',
    id: '110000',
    created: '01/15/2024 09:02 AM',
    task: '',
    title: 'Need to call back,',
    customer: 'John Smith',
    phone: '(999) 999-9999',
    deadline: '01/21/2024 09:02 AM',
    user: 'Ali Brian',
  },
  {
    key: '2',
    done: 'dddd',
    task_id: '10000',
    id: '110000',
    created: '01/15/2024 09:02 AM',
    task: '',
    title: 'Need to call back,',
    customer: 'John Smith',
    phone: '(999) 999-9999',
    deadline: '01/21/2024 09:02 AM',
    user: 'Ali Brian',
  },
  {
    key: '3',
    done: 'ffff',
    task_id: '10000',
    id: '110000',
    created: '01/15/2024 09:02 AM',
    task: '',
    title: 'Need to call back,',
    customer: 'John Smith',
    phone: '(999) 999-9999',
    deadline: '01/21/2024 09:02 AM',
    user: 'Ali Brian',
  },
  {
    key: '4',
    done: 'ooo',
    task_id: '10000',
    id: '110000',
    created: '01/15/2024 09:02 AM',
    task: '',
    title: 'Need to call back,',
    customer: 'John Smith',
    phone: '(999) 999-9999',
    deadline: '01/21/2024 09:02 AM',
    user: 'Ali Brian',
  },
];

// =======users==========

export const UsersTableColumns = [
  {
    title: 'User name',
    dataIndex: 'name',
    render: (name: string) => <a>{name}</a>,
  },
  {
    title: 'First name',
    dataIndex: 'first_name',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
  },
  {
    title: 'Access role',
    dataIndex: 'role',
  },
  {
    title: 'Team',
    dataIndex: 'team',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Position',
    dataIndex: 'position',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <span className={status == 'Active' ? '' : 'status__active'}>
        {status}
      </span>
    ),
  },
  {
    title: 'User created on',
    dataIndex: 'created',
  },
];

export const UsersTableData = [
  {
    key: '1',
    name: 'Ali.Brian.ML',
    firstName: 'John',
    lastName: 'Brian',
    access: 'Sales',
    team: 'Sean.T',
    position: 'Sales',
    status: 'Active',
    created: '01/13/2024 09:27 AM',
  },
];

// =======Team==========

export const TeamTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a>{name}</a>,
  },
  {
    title: 'Users',
    dataIndex: 'users',
    render: (data: string[]) => (
      <div>
        {data.length > 0 ? (
          <span className="user__count"> Total {data.length}</span>
        ) : (
          <span className="user__empty">Empty</span>
        )}
        {data.length > 0 &&
          data.map((item, index) => {
            if (index < 8) {
              return (
                <span key={index} className="user__name">
                  {item}
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
      <span className={status == 'Active' ? '' : 'status__active'}>
        {status}
      </span>
    ),
  },
  {
    title: 'User created on',
    dataIndex: 'created',
  },
];

export const TeamTableData = [
  {
    key: '1',
    name: 'Ali.T',
    users: [
      'jon',
      'Azim',
      'Ali',
      'Jonathan',
      'Sam',
      'Jack',
      'Mike',
      'Alice',
      'Scott',
      'Tulkin',
    ],
    status: 'Active',
    created: '01/13/2024 09:27 AM',
  },
  {
    key: '2',
    name: 'Daniel.T',
    users: [],
    status: 'Inactive',
    created: '01/13/2024 09:27 AM',
  },
  {
    key: '3',
    name: 'Daniel.T',
    users: [
      'John',
      'Ali',
      'Jonathan',
      'Sam',
      'Alice',
      'Scott',
      'Tulkin',
      'Jakhongir',
    ],
    status: 'Active',
    created: '01/13/2024 09:27 AM',
  },
];

// =======Providers==========

export const ProvidersTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (name: string) => <a>{name}</a>,
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
      <span className={status == 'Active' ? '' : 'status__active'}>
        {status}
      </span>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Created on',
    dataIndex: 'created_on',
  },
  {
    title: 'Created by',
    dataIndex: 'created_by',
  },
];

export const ProvidersTableData = [
  {
    key: '1',
    name: 'Provider 001',
    email: 'provider@gmail.com',
    subject: '...',
    status: 'Active',
    type: 'Standard',
    created_on: '01/13/2024 09:27 AM',
    created_by: 'Ali Brian',
  },
  {
    key: '2',
    name: 'Provider 001',
    email: 'provider@gmail.com',
    subject: '...',
    status: 'Active',
    type: 'Standard',
    created_on: '01/13/2024 09:27 AM',
    created_by: 'Ali Brian',
  },
  {
    key: '3',
    name: 'Provider 001',
    email: 'provider@gmail.com',
    subject: '...',
    status: 'Active',
    type: 'Standard',
    created_on: '01/13/2024 09:27 AM',
    created_by: 'Ali Brian',
  },
  {
    key: '4',
    name: 'Provider 001',
    email: 'provider@gmail.com',
    subject: '...',
    status: 'Inactive',
    type: 'Standard',
    created_on: '01/13/2024 09:27 AM',
    created_by: 'Ali Brian',
  },
];

// =======Distribution==========

export const DistributionTableColumns = [
  {
    title: 'Users',
    dataIndex: 'users',
    render: (name: string) => <a>{name}</a>,
  },
  {
    title: 'Received today',
    dataIndex: 'received_today',
  },
  {
    title: 'Queue now',
    dataIndex: 'queue_now',
    render: (name: string) => <a>{name}</a>,
  },
  {
    title: 'Multiple',
    dataIndex: 'multiple',
  },
  {
    title: 'Receiving hours',
    dataIndex: 'receiving_hours',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => (
      <span className={status == 'Active' ? '' : 'status__active'}>
        {status}
      </span>
    ),
  },
  {
    title: 'Paused by',
    dataIndex: 'paused_by',
  },
];

export const DistributionTableData = [
  {
    key: '1',
    users: 'Ali.Brian.ML',
    received_today: '12',
    queue_now: '2',
    multiple: '1X',
    receiving_hours: '00:00 am - 00:00 am',
    status: 'Active',
    paused_by: 'Ali Brian',
  },
  {
    key: '2',
    users: 'Ali.Brian.ML',
    received_today: '12',
    queue_now: '5',
    multiple: '1X',
    receiving_hours: '00:00 am - 00:00 am',
    status: 'Inactive',
    paused_by: 'Ali Brian',
  },
  {
    key: '3',
    users: 'Ali.Brian.ML',
    received_today: '12',
    queue_now: '4',
    multiple: '1X',
    receiving_hours: '00:00 am - 00:00 am',
    status: 'Active',
    paused_by: 'Ali Brian',
  },
  {
    key: '4',
    users: 'Ali.Brian.ML',
    received_today: '12',
    queue_now: '0',
    multiple: '1X',
    receiving_hours: '00:00 am - 00:00 am',
    status: 'Inactive',
    paused_by: 'Ali Brian',
  },
];
