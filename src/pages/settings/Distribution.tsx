import { Table } from 'antd';
import TableHeader from '../../ui/table/TableHeader';
import {
  DistributionTableColumns,
  DistributionTableData,
} from '../../utils/table';

type DataType = {
  key: string;
  users: string;
  received_today: string;
  queue_now: string;
  multiple: string;
  receiving_hours: string;
  status: string;
  paused_by: string;
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
    name: record.paused_by,
  }),
};
export default function Distribution() {
  return (
    <div className="distribution">
      <TableHeader />
      <div className="table__container">
        <Table
          rowSelection={{
            ...rowSelection,
          }}
          columns={DistributionTableColumns}
          dataSource={DistributionTableData}
        />
      </div>
    </div>
  );
}
