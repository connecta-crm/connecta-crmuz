import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { RolsTableColumns } from './RolsTableColumn';
import { RolsTableDataType } from './rolsTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: RolsTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: RolsTableDataType) => ({
    name: record.accessName,
  }),
};
export default function RolsTable({
  count,
  dataSource,
  isLoading,
  setOpenModal,
  isLoadingRole,
  setEditId,
}: {
  count: number;
  dataSource: RolsTableDataType[];
  isLoading: boolean;
  setOpenModal: (a: boolean) => void;
  isLoadingRole: boolean;
  setEditId: (a: number | null) => void;
}) {
  return (
    <>
      <div className="dt-header">
        <SettingsTableHeaderActions
          onOpenModal={setOpenModal}
          pageName="Access Role"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename="roles"
        />
      </div>
      <div className="table__container">
        <Table
          loading={isLoading || isLoadingRole}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={RolsTableColumns}
          dataSource={dataSource}
          onRow={(data: RolsTableDataType) => ({
            onClick: (event) => {
              const target = event.target as HTMLTextAreaElement;
              const element = target.className;
              element == 'table__id' && setEditId(data?.id);
            },
          })}
        />
      </div>
    </>
  );
}
