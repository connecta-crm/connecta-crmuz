import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import TableHeaderActions from '../../ui/TableHeaderActions';
import TableHeaderFilters from '../../ui/TableHeaderFilters';
import { LeadTableColumns } from './LeadTableColumn';
import { LeadTableDataType } from './LeadTableColumnType';
import { setLeadData } from './leadSlice';
import { useLead } from './useLead';
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

type OpenDrawerType = {
  openDrawer: (e: boolean) => void;
};

function LeadTable({ openDrawer }: OpenDrawerType) {
  const [guid, setGuid] = useState<string | null>(null);
  const { leads, count, isLoading: isLoadingLeads } = useLeads();
  const { lead, isLoading: isLoadingLead, error } = useLead(guid);

  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string) => {
    openDrawer(false);
    setGuid(guid);
  };

  useEffect(() => {
    if (!isLoadingLead && !error) {
      dispatch(setLeadData(lead));
      openDrawer(true);
    }
  }, [isLoadingLead, error, dispatch, lead]);
  console.log(count);

  return (
    <>
      <div className="dt-header">
        <TableHeaderActions pageName="lead" />
        <TableHeaderFilters count={count} sumPrice={undefined} />
      </div>
      <div className="leads-table">
        <div className="table__container">
          <Table
            rowKey="id"
            rowSelection={{ ...rowSelection }}
            columns={LeadTableColumns}
            dataSource={leads}
            pagination={{ pageSize: leads?.length }}
            loading={isLoadingLeads || (isLoadingLead && !!guid)}
            onRow={(data) => ({
              onClick: (event) => {
                const target = event.target as HTMLTextAreaElement;
                const element = target.className;
                element == 'table__id' && handleOpenDrawer(data.guid);
              },
            })}
          />
        </div>
      </div>
    </>
  );
}
export default LeadTable;
