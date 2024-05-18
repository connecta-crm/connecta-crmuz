import { Drawer } from 'antd';

import { useDrawerFeature } from '../context/DrawerFeatureContext';
import DrawerContent from '../features/drawer/Drawer';
import DrawerControl from '../features/drawer/DrawerControl';
import DrawerHeader from '../features/drawer/DrawerHeader';
import { LeadData } from '../features/leads/leadSlice';
import { LeadTableDataType } from '../features/leads/LeadTableColumnType';

export type DrawerProps = {
  data: LeadData | LeadTableDataType;
  isLoadingLead: boolean;
  onOpenDrawer: (guid: string) => void;
};

function DrawerApp({ data, isLoadingLead, onOpenDrawer }: DrawerProps) {
  const { isFullScreen, isOpenDrawer } = useDrawerFeature();

  const drawerWith = isFullScreen ? 'calc(100% - 56px)' : '76%';

  return (
    <div>
      <Drawer
        title={
          <DrawerHeader
            data={data}
            isLoadingLead={isLoadingLead}
            onOpenDrawer={onOpenDrawer}
          />
        }
        placement="right"
        open={isOpenDrawer}
        getContainer={false}
        width={drawerWith}
        height="calc(100% - 56px)"
        maskClosable={false}
        closeIcon={false}
      >
        <DrawerControl
          data={data}
          isLoadingLead={isLoadingLead}
          onOpenDrawer={onOpenDrawer}
        />
        <DrawerContent />
      </Drawer>
    </div>
  );
}

export default DrawerApp;
