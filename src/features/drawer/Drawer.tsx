import { DrawerSourceType } from '../../ui/Drawer.tsx';
import DrawerFeature from './DrawerFeature.tsx';
import DrawerMain from './DrawerMain.tsx';

function Drawer({ sourceType }: DrawerSourceType) {
  return (
    <div className="drawer d-flex">
      <div className="drawer__feature feature-drawer">
        <DrawerFeature sourceType={sourceType} />
      </div>
      <div className="drawer__main main-drawer p-20">
        {sourceType !== 'customer' ? (
          <DrawerMain sourceType={sourceType} />
        ) : (
          <h1 className="text-center mt-20">This content is in test mode ❗️</h1>
        )}
      </div>
    </div>
  );
}

export default Drawer;
