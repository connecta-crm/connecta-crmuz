import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { UsersTableColumn } from './UsersTableColumn';
import { UsersTableDataType } from './usersTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: UsersTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: UsersTableDataType) => ({
    name: record.firstName,
  }),
};
export default function UsersTable({
  count,
  dataSource,
  isLoading,
  setOpenModal,
  setUserId,
  isLoadingUser,
}: {
  count: number;
  dataSource: UsersTableDataType[];
  isLoading: boolean;
  isLoadingUser:boolean
  setOpenModal: (a: boolean) => void;
  setUserId: (a: number | null) => void;
}) {
  return (
    <>
      <div className="dt-header">
        <SettingsTableHeaderActions
          onOpenModal={setOpenModal}
          pageName="Users"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename="users"
        />
      </div>
      <div className="table__container">
        <Table
          loading={isLoading||isLoadingUser}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={UsersTableColumn}
          dataSource={dataSource}
          onRow={(data: UsersTableDataType) => ({
            onClick: (event) => {
              const target = event.target as HTMLTextAreaElement;
              const element = target.className;
              element == 'table__id' && setUserId(data.id);
            },
          })}
        />
      </div>
    </>
  );
}
