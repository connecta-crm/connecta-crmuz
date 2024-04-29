import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { LeadTableColumns } from './LeadTableColumn';
import { LeadTableDataType } from './LeadTableColumnType';
import useLead from './useLead';
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
export default function LeadTable() {
  const [leads, setLead] = useState([]);
  const { data, isSuccess } = useLead();

  useEffect(() => {
    if (isSuccess) setLead(data?.data);
  }, [data]);

  return (
    <Table
      rowKey="id"
      rowSelection={{
        ...rowSelection,
      }}
      columns={LeadTableColumns}
      dataSource={leads}
    />
  );
}
