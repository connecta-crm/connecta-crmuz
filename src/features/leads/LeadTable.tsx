import { Table } from 'antd';
import Empty from '../../ui/Empty';
import TableHeaderActions from '../../ui/TableHeaderActions';
import TableHeaderFilters from '../../ui/TableHeaderFilters';
import { LeadTableColumns } from './LeadTableColumn';
import { LeadTableDataType } from './LeadTableColumnType';
import { useLeads } from './useLeads';

const rowSelection = {
  onChange: (
    selectedRowKeys: React.Key[],
    selectedRows: LeadTableDataType[],
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: LeadTableDataType) => ({
    name: record.id,
  }),
};

function LeadTable() {
  const { leads, currentPage, totalPages, totalData, isLoading } = useLeads();

  if (isLoading) return null;
  if (!leads?.length) return <Empty resourceName="leads" />;

  return (
    <>
      <div className="dt-header">
        <TableHeaderActions pageName="lead" />
        <TableHeaderFilters
          currentPage={currentPage}
          totalPages={totalPages}
          totalData={totalData}
        />
      </div>
      <div className="leads-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{
              ...rowSelection,
            }}
            columns={LeadTableColumns}
            dataSource={leads}
          />
        </div>
      </div>
    </>
  );
}
export default LeadTable;
