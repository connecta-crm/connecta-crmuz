import { Drawer } from 'antd';

import DrawerContent from '../features/drawer/Drawer';
import DrawerControl, {
  DrawerControlProps,
} from '../features/drawer/DrawerControl';
import DrawerHeader from '../features/drawer/DrawerHeader';

type DrawerProps = {
  open: boolean;
} & DrawerControlProps;

function DrawerApp({ open, isFullScreen, onFullScreen, onClose }: DrawerProps) {
  const drawerWith = isFullScreen ? 'calc(100% - 56px)' : '76%';

  return (
    <div>
      <Drawer
        title={
          <DrawerHeader
            isFullScreen={isFullScreen}
            onClose={onClose}
            onFullScreen={onFullScreen}
          />
        }
        placement="right"
        open={open}
        getContainer={false}
        width={drawerWith}
        height="calc(100% - 56px)"
        maskClosable={false}
        closeIcon={false}
      >
        <DrawerControl
          isFullScreen={isFullScreen}
          onClose={onClose}
          onFullScreen={onFullScreen}
        />
        <DrawerContent />
      </Drawer>
    </div>
  );
}

export default DrawerApp;
