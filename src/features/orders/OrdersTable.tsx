import { Table } from 'antd';
import TableHeaderActions from '../../ui/TableHeaderActions';
import TableHeaderFilters from '../../ui/TableHeaderFilters';
import { TableProps } from '../leads/LeadTable';
import { OrdersTableColumn } from './OrdersTableColumn';
import { OrdersTableColumnType } from './OrdersTableColumnType';
const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: OrdersTableColumnType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: OrdersTableColumnType) => ({
    name: record.customerName,
  }),
};

function OrdersTable({
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
        <TableHeaderActions onOpenModal={onOpenModal} pageName="order" />
        <TableHeaderFilters count={count} sumPrice={undefined} />
      </div>
      <div className="quotes-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={OrdersTableColumn}
            dataSource={
              quotes as unknown as OrdersTableColumnType[] | undefined
            }
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

export default OrdersTable;
