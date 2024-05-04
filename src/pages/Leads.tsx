import { useState } from 'react';
import LeadTable from '../features/leads/LeadTable';
import DrawerApp from '../ui/Drawer';
import LeadModal from '../ui/modal/LeadModal';

function Leads() {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);

  const openDrawer = (value: boolean) => {
    setOpen(value);
  };
  const closeDrawer = () => {
    setOpen(false);
    setFullScreen(false);
  };
  const makeDrawerFull = (value: boolean) => {
    setFullScreen(value);
  };

  return (
    <div className="leads">
      <LeadTable openDrawer={openDrawer} />
      <LeadModal />
      <DrawerApp
        open={open}
        isFullScreen={isFullScreen}
        onClose={closeDrawer}
        onFullScreen={makeDrawerFull}
      />
    </div>
  );
}

export default Leads;
