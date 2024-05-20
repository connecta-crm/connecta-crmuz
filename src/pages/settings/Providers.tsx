import { Table } from 'antd';
import TableHeader from '../../ui/table/TableHeader';
import { ProvidersTableColumns, ProvidersTableData } from '../../utils/table';
type DataType = {
  key: string;
  name: string;
  email: string;
  subject: string;
  status: string;
  type: string;
  created_on: string;
  created_by: string;
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
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
export default function Providers() {
  return (
    <div className="provider">
      <TableHeader />
      <div className="table__container">
        <Table
          rowSelection={{
            // type: selectionType,
            ...rowSelection,
          }}
          columns={ProvidersTableColumns}
          dataSource={ProvidersTableData}
        />
      </div>
    </div>
  );
}
