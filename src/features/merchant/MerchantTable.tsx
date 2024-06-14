import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { MerchantTableColumn } from './MerchantTableColumn';
import { MerchantTableDataType } from './merchantTableDataType';
import CheckButton from '../../ui/CheckButton';

const items = [
  {
    label: <CheckButton type="merchantType" title="authorize" drop={true} />,
    key: '0',
  },
  {
    label: <CheckButton type="merchantType" title="firstdata" drop={true}  />,
    key: '1',
  },
  {
    label: <CheckButton type="merchantType" title="paypal" drop={true}  />,
    key: '2',
  },
];

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: MerchantTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: MerchantTableDataType) => ({
    name: record.name,
  }),
};
export default function MerchantTable({
  count,
  dataSource,
  isLoading,
  isLoadingTeam,
  setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: MerchantTableDataType[];
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
          pageName="Merchant"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={true}
          pagename="merchants"
          typesData={items}
        />
      </div>
      <div className="table__container">
        <Table
          pagination={{ pageSize: count }}
          loading={isLoading || isLoadingTeam}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={MerchantTableColumn}
          dataSource={dataSource}
          onRow={(data: MerchantTableDataType) => ({
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
