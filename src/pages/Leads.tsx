import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import LeadTable from '../features/leads/LeadTable';
import DrawerApp from '../ui/Drawer';
import LeadModal from '../ui/modal/LeadModal';
import Filter from '../ui/filter/Filter';

function Leads() {
  const [open, setOpen] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const queryClient = useQueryClient();

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
    queryClient.invalidateQueries({
      queryKey: ['lead'],
    });
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
      <Filter/>
    </div>
  );
}

export default Leads;
