import { Table } from 'antd';
import { DrawerProps } from '../../ui/Drawer';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { CustomerTableColumn } from './CustomerTableColumn';
import { CustomerDataType } from './CustomerTableColumnType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: CustomerDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: CustomerDataType) => ({
    name: record.name,
  }),
};

export type TableProps = {
  loadingList: boolean;
  guid: string | number | null;
  count: number;
  onOpenModal: (a: boolean) => void; // todo
} & DrawerProps;

function CustomerTable({
  dataSource: customers,
  guid,
  loadingList,
  loadingItem,
  count,
  onOpenModal,
  onOpenDrawer,
}: TableProps) {
  return (
    <>
      <div className="dt-header">
        <TableHeaderActions onOpenModal={onOpenModal} pageName="customer" />
        <TableHeaderFilters
          count={count}
          sumPrice={undefined}
          sourceType="customer"
        />
      </div>
      <div className="customers-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={CustomerTableColumn}
            dataSource={customers as unknown as CustomerDataType[] | undefined}
            loading={loadingList || (loadingItem && !!guid)}
            pagination={{ position: ['bottomRight'], hideOnSinglePage: true }}
            tableLayout="fixed"
            onRow={(data) => ({
              onClick: (event) => {
                const target = event.target as HTMLTextAreaElement;
                const element = target.className;
                element.includes('table__id') && onOpenDrawer?.(data.id);
              },
            })}
          />
        </div>
      </div>
    </>
  );
}

export default CustomerTable;
