import { Table } from 'antd';
import { UsersTableColumns, UsersTableData } from '../../utils/table';
import TableHeader from '../../ui/TableHeader';
type DataType = {
  key: string,
  name: string,
  first_name: string,
  last_name: string,
  role: string,
  team: string,
  position: string,
  status: string,
  created: string,
};
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
export default function LeadParsing() {
  return (
    <div className="lead-parsing">
      <TableHeader pageName='lead parsing'/>
         <div className='table__container'>
        <Table
          rowSelection={{
            // type: selectionType,
            ...rowSelection,
          }}
          columns={UsersTableColumns}
          dataSource={UsersTableData}
        />
      </div>
    </div>
  )
}
