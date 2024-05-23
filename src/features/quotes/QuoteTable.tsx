import { Table } from 'antd';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { TableProps } from '../leads/LeadTable';
import { QuotesTableColumns } from './QuoteTableColumn';
import { QuotesTableDataType } from './QuoteTableColumnType';
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

function QuotesTable({
  dataSource: quotes,
  loadingList,
  loadingItem,
  guid,
  count,
  onOpenModal,
  onOpenDrawer,
}: TableProps) {
  return (
    <>
      <div className="dt-header">
        <TableHeaderActions onOpenModal={onOpenModal} pageName="quote" />
        <TableHeaderFilters count={count} sumPrice={undefined} />
      </div>
      <div className="quotes-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={QuotesTableColumns}
            dataSource={quotes as unknown as QuotesTableDataType[] | undefined}
            loading={loadingList || (loadingItem && !!guid)}
            onRow={(data) => ({
              onClick: (event) => {
                const target = event.target as HTMLTextAreaElement;
                const element = target.className;
                element == 'table__id' && onOpenDrawer(data.guid);
              },
            })}
          />
        </div>
      </div>
    </>
  );
}

export default QuotesTable;
