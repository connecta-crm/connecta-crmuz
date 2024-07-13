import { Radio, Table } from 'antd';
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
function FilterTable({
  dataSource,
  isLoading,
}: {
  dataSource: FilterTableDataType[];
  isLoading: boolean;
}) {
  return (
    <>
      <div className="table__container">
      <Radio.Group style={{ width: '100%' }}>
        <Table
        tableLayout='fixed'
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={FilterTableColumns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
           </Radio.Group>
      </div>
    </>
  );
}
export default FilterTable;
