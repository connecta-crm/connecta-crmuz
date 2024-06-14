import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { PaymentTableColumn } from './PaymentTableColumn';
import { PaymentTableDataType } from './PaymentTableDataType';
import CheckButton from '../../ui/CheckButton';
const items = [
  {
    label: <CheckButton type="paymentType" title="zelle" drop={true} />,
    key: '0',
  },
  {
    label: <CheckButton type="paymentType" title="paypal" drop={true}  />,
    key: '1',
  },
  {
    label: <CheckButton type="paymentType" title="cashapp" drop={true}  />,
    key: '2',
  },
  {
    label: <CheckButton type="paymentType" title="venmo" drop={true}  />,
    key: '3',
  },
];
const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: PaymentTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: PaymentTableDataType) => ({
    name: record.name,
  }),
};
export default function PaymentTable({
  count,
  dataSource,
  isLoading,
  isLoadingTeam,
  setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: PaymentTableDataType[];
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
          pageName="Payment"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={true}
          pagename="payments"
          typesData={items}
        />
      </div>
      <div className="table__container">
        <Table
          pagination={{ pageSize: count }}
          loading={isLoading || isLoadingTeam}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={PaymentTableColumn}
          dataSource={dataSource}
          onRow={(data: PaymentTableDataType) => ({
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
