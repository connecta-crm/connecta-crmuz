import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { TemplatesTableColumn } from './TemplatesTableColumn';
import { TemplatesTableDataType } from './templatesTableDataType';
import CheckButton from '../../ui/CheckButton';
const items = [
  {
    label: <CheckButton type="templateType" title="sms" drop={true} />,
    key: '0',
  },
  {
    label: <CheckButton type="templateType" title="email" drop={true}  />,
    key: '1',
  },
];

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: TemplatesTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: TemplatesTableDataType) => ({
    name: record.name,
  }),
};
export default function TemplatesTable({
  count,
  dataSource,
  isLoading,
  isLoadingTeam,
  setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: TemplatesTableDataType[];
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
          pageName="Templates"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={true}
          pagename="templates"
          typesData={items}
        />
      </div>
      <div className="table__container">
        <Table
          pagination={{ pageSize: count }}
          loading={isLoading || isLoadingTeam}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={TemplatesTableColumn}
          dataSource={dataSource}
          onRow={(data: TemplatesTableDataType) => ({
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
