import { Table } from 'antd';
import TableHeader from '../ui/TableHeader';
import { ContactTableColumns, ContactTableData } from '../utils/table';

type DataType = {
  key: string;
  customer: string;
  phone: string;
  email: string;
  billing: string;
  completed: string;
  ongoing: string;
  stage: string;
  source: string;
  added: string;
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
    name: record.customer,
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
