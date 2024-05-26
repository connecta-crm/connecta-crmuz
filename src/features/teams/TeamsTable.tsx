import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { TeamTableColumns } from './TeamsTableColumn';
import { TeamsTableDataType } from './teamsTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: TeamsTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: TeamsTableDataType) => ({
    name: record.name,
  }),
};
export default function TeamsTable({
  count,
  dataSource,
  isLoading,
  setOpenModal,
}: {
  count: number;
  dataSource: TeamsTableDataType[];
  isLoading: boolean;
  setOpenModal: (a: boolean) => void;
}) {
  return (
    <>
      <div className="dt-header">
        <SettingsTableHeaderActions
          onOpenModal={setOpenModal}
          pageName="Teams"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename='teams'
        />
      </div>
      <div className="table__container">
        <Table
          loading={isLoading}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={TeamTableColumns}
          dataSource={dataSource}
        />
      </div>
    </>
  );
}
