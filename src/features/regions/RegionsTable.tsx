import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { RegionsTableColumn } from './RegionsTableColumn';
import { RegionsTableDataType } from './RegionsTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: RegionsTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: RegionsTableDataType) => ({
    name: record.name,
  }),
};
export default function RegionsTable({
  count,
  dataSource,
  isLoading,
  isLoadingTeam,
  setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: RegionsTableDataType[];
  isLoading: boolean;
  isLoadingTeam: boolean;
  setOpenModal: (a: boolean) => void;
  setEditId: (a: number | null) => void;
}) {
  return (
    <>
      <div className="dt-header">
        <SettingsTableHeaderActions
          onOpenModal={setOpenModal}
          pageName="Hawaii and Alaska"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename="contracts"
        />
      </div>
      <div className="table__container">
        <Table
          pagination={{ pageSize: count }}
          loading={isLoading || isLoadingTeam}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={RegionsTableColumn}
          dataSource={dataSource}
          onRow={(data: RegionsTableDataType) => ({
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
