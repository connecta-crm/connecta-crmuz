import { useDrawerFeature } from '../context/DrawerFeatureContext';
import LeadTable from '../features/leads/LeadTable';
import DrawerApp from '../ui/Drawer';
import LeadModal from '../ui/modal/LeadModal';

function Leads() {
  const { closeDrawer, isFullScreen, makeDrawerFull, isOpenDrawer } =
    useDrawerFeature();
  return (
    <div className="leads">
      <LeadTable />
      <LeadModal />
      <DrawerApp
        open={isOpenDrawer}
        isFullScreen={isFullScreen}
        onClose={closeDrawer}
        onFullScreen={makeDrawerFull}
      />
    </div>
  );
}

export default Leads;
