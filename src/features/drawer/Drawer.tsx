import DrawerFeature from './DrawerFeature.tsx';
import DrawerMain from './DrawerMain.tsx';

function Drawer() {
  return (
    <div className="drawer d-flex">
      <div className="drawer__feature feature-drawer">
        <DrawerFeature />
      </div>
      <div className="drawer__main main-drawer p-20">
        <DrawerMain />
      </div>
    </div>
  );
}

export default Drawer;
