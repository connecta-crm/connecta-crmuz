import { Radio, Table } from 'antd';
import { Key, useState } from 'react';
import { DrawerProps, SourceType } from '../../ui/Drawer';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { LeadTableColumns } from './LeadTableColumn';
import { LeadTableDataType } from './LeadTableColumnType';

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
  const [checkedTableRows, setCheckedTableRows] = useState<Key[]>();

  const rowSelection = {
    onChange: (
      selectedRowKeys: Key[],
      // selectedRows: LeadTableDataType[],
    ) => {
      setCheckedTableRows(selectedRowKeys);
    },
    getCheckboxProps: (record: LeadTableDataType) => ({
      name: record.id,
    }),
  };

  return (
    <>
      <div className="dt-header">
        <TableHeaderActions
          pageName="lead"
          sourceType="lead"
          onOpenModal={onOpenModal}
          checkedTableRows={checkedTableRows}
        />
        <TableHeaderFilters
          count={count}
          sumPrice={undefined}
          sourceType="lead"
        />
      </div>
      <div className="leads-table">
        <div className="table__container">
          <Radio.Group style={{ width: '100%' }}>
            <Table
              tableLayout="fixed"
              rowKey="id"
              rowSelection={{ ...rowSelection }}
              columns={LeadTableColumns}
              dataSource={leads as unknown as LeadTableDataType[] | undefined}
              loading={loadingList || (loadingItem && !!guid)}
              onRow={(data) => ({
                onClick: (event) => {
                  const target = event.target as HTMLTextAreaElement;
                  const element = target.className;
                  element == 'table__id' && onOpenDrawer?.(data.guid);
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
