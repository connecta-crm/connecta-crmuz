import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerProps } from '../../ui/Drawer';
import { getLeadData } from '../leads/leadSlice';
import { getNextObjectId, getPreviousObjectId } from './useDrawerControl';

export type DrawerControlProps = {
  isFullScreen: boolean;
  onClose: () => void;
  onPrevData: () => void;
  onNextData: () => void;
  onFullScreen: (val: boolean) => void;
};

function DrawerControl({ leads, isLoadingLead, onOpenDrawer }: DrawerProps) {
  const { closeDrawer, isFullScreen, makeDrawerFull } = useDrawerFeature();
  const { guid: currentLeadGuid } = useAppSelector(getLeadData);

  if (isFullScreen) {
    return null;
  }

  const handlePrevElement = () => {
    const previousLeadGuid = getPreviousObjectId(leads, currentLeadGuid);
    onOpenDrawer(previousLeadGuid);
  };
  const handleNextElement = () => {
    const nextLeadId = getNextObjectId(leads, currentLeadGuid);
    onOpenDrawer(nextLeadId);
  };

  return (
    <div className="drawer-control">
      <div
        onClick={closeDrawer}
        className="drawer-control__item drawer-control__item_close cursor-pointer"
      >
        <img src="./img/drawer/close-arrow.svg" alt="" />
      </div>
      <div
        onClick={() => makeDrawerFull(true)}
        className="drawer-control__item drawer-control__item_size cursor-pointer"
      >
        <img src="./img/drawer/resize.svg" alt="" />
      </div>
      <button
        title="prev-element"
        disabled={isLoadingLead}
        onClick={handlePrevElement}
        className="drawer-control__item drawer-control__item_up-arrow"
      >
        <img src="./img/drawer/up-arrow.svg" alt="" />
      </button>
      <button
        disabled={isLoadingLead}
        title="next-element"
        onClick={handleNextElement}
        className="drawer-control__item drawer-control__item_down-arrow"
      >
        <img src="./img/drawer/down-arrow.svg" alt="" />
      </button>
    </div>
  );
}

export default DrawerControl;
