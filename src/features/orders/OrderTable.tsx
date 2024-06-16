import { Table } from 'antd';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { TableProps } from '../leads/LeadTable';
import { OrderTableColumn } from './OrderTableColumn';
import { OrderTableDataType } from './OrderTableColumnType';
const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: OrderTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: OrderTableDataType) => ({
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
            columns={OrderTableColumn}
            dataSource={quotes as unknown as OrderTableDataType[] | undefined}
            loading={loadingList || (loadingItem && !!guid)}
            pagination={{ position: ['bottomRight'] }}
            onRow={(data) => ({
              onClick: (event) => {
                const target = event.target as HTMLTextAreaElement;
                const element = target.className;
                element == 'table__id' && onOpenDrawer?.(data.guid);
              },
            })}
          />
        </div>
      </div>
    </>
  );
}

export default OrdersTable;
