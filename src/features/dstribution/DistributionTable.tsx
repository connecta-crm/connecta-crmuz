import { Table } from 'antd';
import SettingsTableHeaderActions from '../../ui/SettingsTableHeaderActions';
import SettingsTableHeaderFilters from '../../ui/SettingsTableHeaderFilters';
import { DistributionColumn } from './DistributionColumn';
import { DistributionDataType } from './DistributionDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: DistributionDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DistributionDataType) => ({
    name: record.finishHour,
  }),
};
export default function DistributionTable({
  count,
  dataSource,
  isLoading,
  setOpenModal,
  setDistributionId,
  isLoadingUser,
}: {
  count: number;
  dataSource: DistributionDataType[];
  isLoading: boolean;
  isLoadingUser: boolean;
  setOpenModal: (a: boolean) => void;
  setDistributionId: (a: number | null) => void;
}) {
  return (
    <>
      <div className="dt-header">
        <SettingsTableHeaderActions
        hasAddBtn={false}
          onOpenModal={setOpenModal}
          pageName="Distribution"
        />
        <SettingsTableHeaderFilters
          count={count}
          hasFilterBtn={false}
          hasFilterSelect={false}
          pagename="distributions"
        />
      </div>
      <div className="table__container">
        <Table
          loading={isLoading || isLoadingUser}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={DistributionColumn}
          dataSource={dataSource}
          onRow={(data: DistributionDataType) => ({
            onClick: (event) => {
              const target = event.target as HTMLTextAreaElement;
              const element = target.className;
              element == 'table__id' && setDistributionId(data.id);
            },
          })}
        />
      </div>
    </>
  );
}
