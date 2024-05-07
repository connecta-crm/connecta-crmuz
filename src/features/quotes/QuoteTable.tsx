import { Table } from 'antd';
import { QuotesTableColumns } from './QuotesTableColumn';
import { QuotesTableDataType } from './QuotesTableColumnType';
// import { useQuotes } from './useQuotes';
import TableHeaderActions from '../../ui/TableHeaderActions';
import TableHeaderFilters from '../../ui/TableHeaderFilters';
import { useLeads } from '../leads/useLeads';
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
type openDrawerType = (data:QuotesTableDataType ) => void;

function QuotesTable({ openDrawer }: { openDrawer: openDrawerType }) {
  const { leads, count, isLoading } = useLeads();
  return (
    <>
      <div className="dt-header">
        <TableHeaderActions pageName="quote" />
        <TableHeaderFilters count={count} sumPrice={undefined} />
      </div>
      <div className="quotes-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={QuotesTableColumns}
            dataSource={leads}
            pagination={{ pageSize: leads?.length }}
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
