import { useQueryClient } from '@tanstack/react-query';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerProps } from '../../ui/Drawer';
import { getLeadData } from '../leads/leadSlice';
import { getQuoteData } from '../quotes/quoteSlice';
import { getNextObjectId, getPreviousObjectId } from './useDrawerControl';

export type DrawerControlProps = {
  isFullScreen: boolean;
  onClose: () => void;
  onPrevData: () => void;
  onNextData: () => void;
  onFullScreen: (val: boolean) => void;
};

function DrawerControl({
  sourceType,
  dataSource,
  loadingItem,
  onOpenDrawer,
}: DrawerProps) {
  const { closeDrawer, isFullScreen, makeDrawerFull } = useDrawerFeature();
  const { guid: currentLeadGuid } = useAppSelector(getLeadData);
  const { guid: currentQuoteGuid } = useAppSelector(getQuoteData);
  const queryClient = useQueryClient();

  if (isFullScreen) {
    return null;
  }

  const getCurrentDataGuid = () => {
    let currentDataGuid = '0';
    switch (sourceType) {
      case 'lead':
        currentDataGuid = currentLeadGuid;
        break;
      case 'quote':
        currentDataGuid = currentQuoteGuid;
        break;
      default:
        break;
    }
    return currentDataGuid;
  };

  const handlePrevElement = () => {
    const currentDataGuid = getCurrentDataGuid();
    const previousDataGuid = getPreviousObjectId(dataSource, currentDataGuid);
    queryClient.invalidateQueries({ queryKey: [`${sourceType}Attachments`] });
    onOpenDrawer(previousDataGuid);
  };

  const handleNextElement = () => {
    const currentDataGuid = getCurrentDataGuid();
    const nextDataId = getNextObjectId(dataSource, currentDataGuid);
    queryClient.invalidateQueries({ queryKey: [`${sourceType}Attachments`] });
    onOpenDrawer(nextDataId);
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
        disabled={loadingItem}
        onClick={handlePrevElement}
        className="drawer-control__item drawer-control__item_up-arrow"
      >
        <img src="./img/drawer/up-arrow.svg" alt="" />
      </button>
      <button
        disabled={loadingItem}
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
