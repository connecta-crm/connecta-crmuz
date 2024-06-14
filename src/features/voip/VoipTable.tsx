import { Table } from 'antd';
import CheckButton from '../../ui/CheckButton';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { VoipTableColumn } from './VoipTableColumn';
import { VoipTableDataType } from './voipTableDataType';
const items = [
  {
    label: <CheckButton type="voipType" title="zoom" drop={true} />,
    key: '0',
  },
  {
    label: <CheckButton type="voipType" title="dialpad" drop={true} />,
    key: '1',
  },
  {
    label: <CheckButton type="voipType" title="ringcentral" drop={true} />,
    key: '2',
  },
];
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
          hasFilterSelect={true}
          pagename="voips"
          typesData={items}
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
