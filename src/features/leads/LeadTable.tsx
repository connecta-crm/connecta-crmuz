import { Radio, Table } from 'antd';
import { DrawerProps, SourceType } from '../../ui/Drawer';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { LeadTableColumns } from './LeadTableColumn';
import { LeadTableDataType } from './LeadTableColumnType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: LeadTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: LeadTableDataType) => ({
    name: record.id,
  }),
};

export type TableProps = {
  loadingList: boolean;
  guid: string | null;
  count: number;
  onOpenModal: (a: boolean) => void; // todo
} & DrawerProps & { sourceType: SourceType };

function LeadTable({
  dataSource: leads,
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
        <TableHeaderActions onOpenModal={onOpenModal} pageName="lead" />
        <TableHeaderFilters count={count} sumPrice={undefined} />
      </div>
      <div className="leads-table">
        <div className="table__container">
          <Radio.Group style={{ width: '100%' }}>
            <Table
              rowKey="id"
              rowSelection={{ ...rowSelection }}
              columns={LeadTableColumns}
              dataSource={leads as unknown as LeadTableDataType[] | undefined}
              loading={loadingList || (loadingItem && !!guid)}
              onRow={(data) => ({
                onClick: (event) => {
                  const target = event.target as HTMLTextAreaElement;
                  const element = target.className;
                  element == 'table__id' && onOpenDrawer(data.guid);
                },
              })}
            />
          </Radio.Group>
        </div>
      </div>
    </>
  );
}

export default LeadTable;
