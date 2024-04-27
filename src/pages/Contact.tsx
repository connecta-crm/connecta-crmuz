import { Table } from 'antd';
import TableHeader from '../ui/TableHeader';
import { ContactTableColumns, ContactTableData } from '../utils/table';

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

function Inbox() {
  return (
    <div className="inbox">
      <TableHeader pageName="contact" />
      <div className="quotes-table">
        <div className="table__container">
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={ContactTableColumns}
            dataSource={ContactTableData}
          />
        </div>
      </div>
    </div>
  );
}
export default Inbox;
