import { Drawer } from 'antd';

import { useDrawerFeature } from '../context/DrawerFeatureContext';
import DrawerContent from '../features/drawer/Drawer';
import DrawerControl from '../features/drawer/DrawerControl';
import DrawerHeader from '../features/drawer/DrawerHeader';
import { LeadTableDataType } from '../features/leads/LeadTableColumnType';
import { QuotesTableDataType } from '../features/quotes/QuotesTableColumnType';
import { LeadData } from '../models';

type DataSourceType = LeadData | LeadTableDataType | QuotesTableDataType;

export type DrawerProps = {
  dataSource: DataSourceType;
  loadingItem: boolean;
  onOpenDrawer: (guid: string) => void;
};

function DrawerApp({ dataSource, loadingItem, onOpenDrawer }: DrawerProps) {
  const { isFullScreen, isOpenDrawer } = useDrawerFeature();

  const drawerWith = isFullScreen ? 'calc(100% - 56px)' : '76%';

  return (
    <div>
      <Drawer
        title={
          <DrawerHeader
            dataSource={dataSource}
            loadingItem={loadingItem}
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
          dataSource={dataSource}
          loadingItem={loadingItem}
          onOpenDrawer={onOpenDrawer}
        />
        <DrawerContent />
      </Drawer>
    </div>
  );
}

export default DrawerApp;
