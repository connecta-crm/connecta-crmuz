import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { VoipTableColumn } from './VoipTableColumn';
import { VoipTableDataType } from './voipTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: VoipTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: VoipTableDataType) => ({
    name: record.name,
  }),
};
export default function VoipTable({
  count,
  dataSource,
  isLoading,
  isLoadingTeam,
  setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: VoipTableDataType[];
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
          pageName="Voip"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename="voips"
        />
      </div>
      <div className="table__container">
        <Table
          pagination={{ pageSize: count }}
          loading={isLoading || isLoadingTeam}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={VoipTableColumn}
          dataSource={dataSource}
          onRow={(data: VoipTableDataType) => ({
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
