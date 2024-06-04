import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { ProvidersTableColumn } from './SettingProvidersTableColumn';
import { SettingProvidersTableDataType } from './setttingProviderTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: SettingProvidersTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: SettingProvidersTableDataType) => ({
    name: record.name,
  }),
};
export default function SettingProvidersTable({
  count,
  dataSource,
  isLoading,
  setOpenModal,
  setProviderId,
  isLoadingUser,
}: {
  count: number;
  dataSource: SettingProvidersTableDataType[];
  isLoading: boolean;
  isLoadingUser: boolean;
  setOpenModal: (a: boolean) => void;
  setProviderId: (a: number | null) => void;
}) {
  return (
    <>
      <div className="dt-header">
        <SettingsTableHeaderActions
          onOpenModal={setOpenModal}
          pageName="Providers"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={true}
          hasFilterSelect={false}
          pagename="providers"
        />
      </div>
      <div className="table__container">
        <Table
          loading={isLoading || isLoadingUser}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={ProvidersTableColumn}
          dataSource={dataSource}
          onRow={(data: SettingProvidersTableDataType) => ({
            onClick: (event) => {
              const target = event.target as HTMLTextAreaElement;
              const element = target.className;
              element == 'table__id' && setProviderId(data.id);
            },
          })}
        />
      </div>
    </>
  );
}
