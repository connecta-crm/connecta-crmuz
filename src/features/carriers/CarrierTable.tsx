import { Table } from 'antd';
import { DrawerProps } from '../../ui/Drawer';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { CarrierTableColumn } from './CarrierTableColumn';
import { CarrierDataType } from './CarrierTableColumnType';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: CarrierDataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: CarrierDataType) => ({
    name: record.name,
  }),
};

export type TableProps = {
  loadingList: boolean;
  guid: string | number | null;
  count: number;
  onOpenModal: (a: boolean) => void; // todo
} & DrawerProps;

function CarrierTable({
  dataSource: carriers,
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
        <TableHeaderActions onOpenModal={onOpenModal} pageName="carrier" />
        <TableHeaderFilters
          count={count}
          sumPrice={undefined}
          sourceType="carrier"
        />
      </div>
      <div className="carriers-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={CarrierTableColumn}
            dataSource={carriers as unknown as CarrierDataType[] | undefined}
            loading={loadingList || (loadingItem && !!guid)}
            pagination={{ position: ['bottomRight'], hideOnSinglePage: true }}
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

export default CarrierTable;
