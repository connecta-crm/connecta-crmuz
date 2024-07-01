import { Radio, Table } from 'antd';
import { DrawerProps, SourceType } from '../../ui/Drawer';
import TableHeaderActions from '../../ui/table/TableHeaderActions';
import TableHeaderFilters from '../../ui/table/TableHeaderFilters';
import { TaskTableColumns } from '../../utils/table';
import { TaskTableDataType } from './TaskTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: TaskTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: TaskTableDataType) => ({
    name: record.id,
  }),
};

export type TableProps = {
  loadingList: boolean;
  guid: string | null;
  count: number;
  onOpenModal: (a: boolean) => void; // todo
} & DrawerProps & { sourceType: SourceType };

function TaskTable({
  dataSource: tasks,
  loadingList,
  loadingItem,
  guid,
  count,
  onOpenModal,
  sourceType,
}: TableProps) {
  return (
    <>
      <div className="dt-header">
        <TableHeaderActions onOpenModal={onOpenModal} pageName="task" />
        <TableHeaderFilters
          count={count}
          sumPrice={undefined}
          sourceType={sourceType}
        />
      </div>
      <div className="leads-table">
        <div className="table__container">
          <Radio.Group style={{ width: '100%' }}>
            <Table
              rowKey="id"
              rowSelection={{ ...rowSelection }}
              columns={TaskTableColumns}
              dataSource={tasks as unknown as TaskTableDataType[] | undefined}
              loading={loadingList || (loadingItem && !!guid)}
            />
          </Radio.Group>
        </div>
      </div>
    </>
  );
}

export default TaskTable;
