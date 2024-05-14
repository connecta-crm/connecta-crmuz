import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerProps } from '../../ui/Drawer';
import { LeadData, getLeadData } from '../leads/leadSlice';

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

  function getNextLeadGuid() {
    if (Array.isArray(leads)) {
      const currentIndex = leads.findIndex(
        (lead: LeadData) => lead.guid === currentLeadGuid,
      );
      const nextIndex =
        currentIndex === leads.length - 1 ? 0 : currentIndex + 1;
      return leads[nextIndex].guid;
    }
  }

  function getPreviousObjectId() {
    if (Array.isArray(leads)) {
      const currentIndex = leads.findIndex(
        (lead: LeadData) => lead.guid === currentLeadGuid,
      );
      const previousIndex =
        currentIndex === 0 ? leads.length - 1 : currentIndex - 1;
      return leads[previousIndex].guid;
    }
  }

  const handlePrevElement = () => {
    const previousLeadGuid = getPreviousObjectId();
    onOpenDrawer(previousLeadGuid);
  };
  const handleNextElement = () => {
    const nextLeadId = getNextLeadGuid();
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
