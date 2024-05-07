import { Table } from 'antd';
import { QuotesTableData,QuotesTableColumns } from '../../utils/table';

type DataType = {
  key: string;
  id: string;
  quotes: string;
  node: number;
  user: string;
  customer: string;
  phone: string;
  vehicle: string;
  origin: string;
  destination: string;
  price: string;
  ship: string;
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
    name: record.user,
  }),
};

function QuotesTable() {
  return (
          <Table
            rowSelection={{
              // type: selectionType,
              ...rowSelection,
            }}
            columns={QuotesTableColumns}
            dataSource={QuotesTableData}
          />
  );
}

export default QuotesTable;
