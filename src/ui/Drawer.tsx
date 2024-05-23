import { Drawer } from 'antd';
import { useDrawerFeature } from '../context/DrawerFeatureContext';
import DrawerContent from '../features/drawer/Drawer';
import DrawerControl from '../features/drawer/DrawerControl';
import DrawerHeader from '../features/drawer/DrawerHeader';
import { LeadTableDataType } from '../features/leads/LeadTableColumnType';
import { QuotesTableDataType } from '../features/quotes/QuoteTableColumnType';
import { LeadData } from '../models';

type DataSourceType = LeadData | LeadTableDataType | QuotesTableDataType;

export type SourceType = 'lead' | 'quote' | 'order';

export type DrawerSourceType = {
  sourceType: SourceType;
};

export type DrawerProps = {
  dataSource: DataSourceType;
  loadingItem: boolean;
  sourceType: SourceType;
  onOpenDrawer: (guid: string) => void;
};

function DrawerApp({
  dataSource,
  loadingItem,
  sourceType,
  onOpenDrawer,
}: DrawerProps) {
  const { isFullScreen, isOpenDrawer } = useDrawerFeature();

  const drawerWith = isFullScreen ? 'calc(100% - 56px)' : '76%';

  return (
    <div>
      <Drawer
        title={
          <DrawerHeader
            sourceType={sourceType}
            dataSource={dataSource} // todo
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
          sourceType={sourceType}
          dataSource={dataSource} // todo
          loadingItem={loadingItem}
          onOpenDrawer={onOpenDrawer}
        />
        <DrawerContent sourceType={sourceType} />
      </Drawer>
    </div>
  );
}

export default DrawerApp;
