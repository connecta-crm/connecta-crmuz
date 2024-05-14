import { Table } from 'antd';
import { FilterTableColumns } from './FilterTableColumn';
import { FilterTableDataType } from './FilterTableColumnType';
import { useQuotes } from '../../features/quotes/useQuotes';
const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: FilterTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: FilterTableDataType) => ({
    name: record.customerName,
  }),
};


function FilterTable() {
  const { quotes, isLoading } = useQuotes();
  return (
    <>
       <div className='table__container'>
       <Table
            rowKey="id"
            
            rowSelection={{ ...rowSelection }}
            columns={FilterTableColumns}
            dataSource={quotes}
            pagination={{ pageSize: quotes?.length }}
            loading={isLoading}
          />
       </div>
    </>
  );
}
export default FilterTable;
