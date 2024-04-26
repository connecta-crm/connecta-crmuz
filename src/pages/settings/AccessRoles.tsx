import { Table } from 'antd';
import { TeamTableColumns, TeamTableData } from '../../utils/table';
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

export default function AccessRoles() {
  return (
    <div className='access-table'>
      <div className='table__container'>
        <Table
          rowSelection={{
            // type: selectionType,
            ...rowSelection,
          }}
          columns={TeamTableColumns}
          dataSource={TeamTableData}
        />
      </div>
    </div>
  )
}
