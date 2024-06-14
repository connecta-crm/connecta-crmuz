import { Table } from 'antd';
import React, { useState } from 'react';
import TableHeader from '../ui/table/TableHeader';
import TableSearchButtons from '../ui/table/TableSearchButtons';
import { TaskTableColumns, TaskTableData } from '../utils/table';
// import TaskModal from '../ui/modal/TaskModal';
type DataType = {
  key: string;
  done: string;
  task_id: string;
  id: string;
  created: string;
  task: string;
  title: string;
  customer: string;
  phone: string;
  deadline: string;
  user: string;
};
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.task_id,
  }),
};

export default function Task() {
  const [selectionType] = useState<'checkbox' | 'radio'>('checkbox');
  return (
    <div className="task">
      <TableHeader />
      <TableSearchButtons />
      <div className="quotes-table">
        <div className="table__container">
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={TaskTableColumns}
            dataSource={TaskTableData}
          />
        </div>
      </div>
      {/* <TaskModal/> */}
    </div>
  );
}
