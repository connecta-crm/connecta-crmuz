import { Table } from 'antd';
import { useState } from 'react';
import DrawerApp from '../ui/Drawer';
import TableHeader from '../ui/TableHeader';
import LeadModal from '../ui/modal/LeadModal';
import { LeadTableColumns, LeadTableData } from '../utils/table';

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows,
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

function Leads() {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  function openDrawer() {
    setOpen(true);
  }
  function onClose() {
    console.log('close');
    setOpen(false);
    setFullScreen(false);
  }
  function onDrawerFull(value: boolean) {
    setFullScreen(value);
  }

  return (
    <div className="leads">
      <DrawerApp
        open={open}
        isFullScreen={isFullScreen}
        onClose={onClose}
        onFullScreen={onDrawerFull}
      />

      <div>
        <TableHeader pageName="lead" />
      </div>
      <div className="leads-table">
        <button onClick={openDrawer}>openDrawer</button>
        <div className="table__container">
          <Table
            rowSelection={{
              // type: selectionType,
              ...rowSelection,
            }}
            columns={LeadTableColumns}
            dataSource={LeadTableData}
          />
        </div>
      </div>

      <LeadModal />
    </div>
  );
}

export default Leads;
