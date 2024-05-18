import { Table } from 'antd';
import { QuotesTableColumns } from './QuotesTableColumn';
import { QuotesTableDataType } from './QuotesTableColumnType';
import TableHeaderActions from '../../ui/TableHeaderActions';
import TableHeaderFilters from '../../ui/TableHeaderFilters';
import { useQuotes } from './useQuotes';
const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: QuotesTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: QuotesTableDataType) => ({
    name: record.customerName,
  }),
};
type openDrawerType = (data: QuotesTableDataType) => void;

function QuotesTable({ openDrawer }: { openDrawer: openDrawerType }) {
  const { quotes, count, isLoading } = useQuotes();
  return (
    <>
      <div className="dt-header">
        <TableHeaderActions
          openLeadModal={(s: boolean) => console.log(s)}
          pageName="quote"
        />
        <TableHeaderFilters count={count} sumPrice={undefined} />
      </div>
      <div className="quotes-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={QuotesTableColumns}
            dataSource={quotes}
            pagination={{ pageSize: quotes?.length }}
            loading={isLoading}
            onRow={(data) => ({
              onClick: (event) => {
                const target = event.target as HTMLTextAreaElement;
                const element = target.className;
                element == 'table__id' && openDrawer(data);
              },
            })}
          />
        </div>
      </div>
    </>
  );
}

export default QuotesTable;
