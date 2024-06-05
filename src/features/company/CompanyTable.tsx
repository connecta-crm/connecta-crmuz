import { Table } from 'antd';
import { CompanyTableColumn } from './CompanyTableColumn';
import { CompanyTableDataType } from './companyTableDataType';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: CompanyTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: CompanyTableDataType) => ({
    name: record.name,
  }),
};
export default function CompanyTable({
  count,
  dataSource,
  isLoading,
  isLoadingTeam,
  // setOpenModal,
  setEditId,
}: {
  count: number;
  dataSource: CompanyTableDataType[];
  isLoading: boolean;
  isLoadingTeam: boolean;
  setEditId: (a: number | null) => void;
}) {
  return (
    <>
      <div className="table__container">
        <Table
          pagination={{ pageSize: count }}
          loading={isLoading || isLoadingTeam}
          rowKey="id"
          rowSelection={{ ...rowSelection }}
          columns={CompanyTableColumn}
          dataSource={dataSource}
          onRow={(data: CompanyTableDataType) => ({
            onClick: (event) => {
              const target = event.target as HTMLTextAreaElement;
              const element = target.className;
              element == 'table__id' && setEditId(data.id);
            },
          })}
        />
      </div>
    </>
  );
}
