/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQueryClient } from '@tanstack/react-query';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import TableHeaderActions from '../../ui/TableHeaderActions';
import TableHeaderFilters from '../../ui/TableHeaderFilters';
import { LeadTableColumns } from './LeadTableColumn';
import { LeadTableDataType } from './LeadTableColumnType';
import { getLeadData, setLeadData } from './leadSlice';
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
  openDrawer: () => void;
};

function LeadTable({ openDrawer }: OpenDrawerType) {
  const [guid, setGuid] = useState<string | null>(null);
  const { leads, count, isLoading: isLoadingLeads } = useLeads();
  const { lead, isLoading: isLoadingLead, error } = useLead(guid);

  const queryClient = useQueryClient();

  const leadData = useAppSelector(getLeadData);

  const dispatch = useAppDispatch();

  const handleOpenDrawer = (guid: string) => {
    setGuid(null);
    setTimeout(() => setGuid(guid), 0);
  };

  useEffect(() => {
    if (!isLoadingLead && !error) {
      dispatch(setLeadData(lead));
      openDrawer();
      // console.log('SET LEAD in Lead Table');
    }
  }, [isLoadingLead, error, dispatch]);

  useEffect(() => {
    if (!isLoadingLeads && leads.length && lead && Object.keys(lead)?.length) {
      dispatch(setLeadData(lead));
      console.log('SET  LEAD in dt', lead);
    }
  }, [leads, lead, dispatch, isLoadingLeads]);

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
