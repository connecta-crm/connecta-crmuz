import { Table } from 'antd';

export interface TaskListTableDataType {
  id: string;
  task: string;
  title: string;
  customer: string;
  due: string;
}

const TaskListTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (text: string) => (
      <span style={{ color: '#086ED6', fontWeight: 500 }}>{text}</span>
    ),
    onHeaderCell: () => {
      return {
        className: 'dashboard-table-th',
      };
    },
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
    onHeaderCell: () => {
      return {
        className: 'dashboard-table-th',
      };
    },
  },
  {
    title: 'Title',
    dataIndex: 'title',
    onHeaderCell: () => {
      return {
        className: 'dashboard-table-th',
      };
    },
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    onHeaderCell: () => {
      return {
        className: 'dashboard-table-th',
      };
    },
  },
  {
    title: 'Due',
    dataIndex: 'due',
    onHeaderCell: () => {
      return {
        className: 'dashboard-table-th',
      };
    },
  },
];

const taskList: TaskListTableDataType[] = [
  {
    id: '100120',
    task: 'Task 1',
    title: 'Need to call back',
    customer: 'John Smith',
    due: '2 days',
  },
  {
    id: '100130',
    task: 'Task 2',
    title: 'Need to call back',
    customer: 'John Smith',
    due: 'Today',
  },
  {
    id: '100140',
    task: 'Task 2',
    title: 'Need to call back',
    customer: 'John Smith',
    due: 'Today',
  },
];

function DashboardTaskListTable() {
  return (
    <div className="leads-table">
      <div className="table__container">
        <Table
          rowKey="id"
          columns={TaskListTableColumns}
          pagination={false}
          dataSource={
            taskList as unknown as TaskListTableDataType[] | undefined
          }
          loading={false}
          tableLayout="fixed"
        />
      </div>
    </div>
  );
}

export default DashboardTaskListTable;
