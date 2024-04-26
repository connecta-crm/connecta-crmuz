export type DrawerControlProps = {
  isFullScreen: boolean;
  onClose: () => void;
  onFullScreen: (val: boolean) => void;
};

function DrawerControl({
  isFullScreen,
  onClose,
  onFullScreen,
}: DrawerControlProps) {
  if (isFullScreen) {
    return null;
  }
  return (
    <div className="drawer-control">
      <div
        onClick={onClose}
        className="drawer-control__item drawer-control__item_close"
      >
        <img src="./img/drawer/close-arrow.svg" alt="" />
      </div>
      <div
        onClick={() => onFullScreen(true)}
        className="drawer-control__item drawer-control__item_size"
      >
        <img src="./img/drawer/resize.svg" alt="" />
      </div>
      <div className="drawer-control__item drawer-control__item_up-arrow">
        <img src="./img/drawer/up-arrow.svg" alt="" />
      </div>
      <div className="drawer-control__item drawer-control__item_down-arrow">
        <img src="./img/drawer/down-arrow.svg" alt="" />
      </div>
    </div>
  );
}

export default DrawerControl;
