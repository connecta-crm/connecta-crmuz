import { useState } from 'react';
import LeadTable from '../features/leads/LeadTable';
import DrawerApp from '../ui/Drawer';
import TableHeader from '../ui/TableHeader';
import LeadModal from '../ui/modal/LeadModal';

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
          <LeadTable />
        </div>
      </div>

      <LeadModal />
    </div>
  );
}

export default Leads;
