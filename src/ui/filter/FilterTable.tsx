import { Table } from 'antd';
import { useQuotes } from '../../features/quotes/useQuotes';
import { FilterTableColumns } from './FilterTableColumn';
import { FilterTableDataType } from './FilterTableColumnType';
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
  const { quotes, isLoadingQuotes } = useQuotes();
  return (
    <>
      <div className="table__container">
        <Table
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={FilterTableColumns}
          dataSource={quotes}
          pagination={{ pageSize: quotes?.length }}
          loading={isLoadingQuotes}
        />
      </div>
    </>
  );
}
export default FilterTable;
