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
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
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
        // type: selectionType,
        ...rowSelection,
      }}
      columns={LeadTableColumns}
      dataSource={leads}
    />
  );
}
