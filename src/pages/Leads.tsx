import { useState } from 'react';
import LeadTable from '../features/leads/LeadTable';
import { LeadTableDataType } from '../features/leads/LeadTableColumnType';
import DrawerApp from '../ui/Drawer';
import LeadModal from '../ui/modal/LeadModal';

function Leads() {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  function openDrawer(data: LeadTableDataType) {
    console.log(data);
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
      {/* <button onClick={openDrawer}>openDrawer</button> */}
      <LeadTable openDrawer={openDrawer} />
      <LeadModal />
      <DrawerApp
        open={open}
        isFullScreen={isFullScreen}
        onClose={onClose}
        onFullScreen={onDrawerFull}
      />
    </div>
  );
}

export default Leads;
