/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerProps, SourceType } from '../../ui/Drawer';
import { getLeadData } from '../leads/leadSlice';
import { getOrderData } from '../orders/orderSlice';
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
}: DrawerProps & { sourceType: SourceType }) {
  const {
    closeDrawer,
    isFullScreen,
    makeDrawerFull,
    onEditDate,
    onEditPerson,
    onEditTab,
    onChangeInnerCollapse,
    onChangeToolbarTabActiveKey,
  } = useDrawerFeature();
  const { guid: currentLeadGuid } = useAppSelector(getLeadData);
  const { guid: currentQuoteGuid } = useAppSelector(getQuoteData);
  const { guid: currentOrderGuid } = useAppSelector(getOrderData);

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
      case 'order':
        currentDataGuid = currentOrderGuid;
        break;
      default:
        break;
    }
    return currentDataGuid;
  };

  const handlePrevElement = () => {
    const currentDataGuid = getCurrentDataGuid();
    const previousDataGuid = getPreviousObjectId(dataSource, currentDataGuid);
    onChangeInnerCollapse([]);
    onChangeToolbarTabActiveKey('1');
    onEditPerson(false);
    onEditDate(false);
    onEditTab(false);
    onOpenDrawer(previousDataGuid);
  };

  const handleNextElement = () => {
    const currentDataGuid = getCurrentDataGuid();
    const nextDataId = getNextObjectId(dataSource, currentDataGuid);
    onChangeInnerCollapse([]);
    onChangeToolbarTabActiveKey('1');
    onEditPerson(false);
    onEditDate(false);
    onEditTab(false);
    onOpenDrawer(nextDataId);
  };

  return (
    <div className="drawer-control">
      <button
        title="Close"
        onClick={closeDrawer}
        className="drawer-control__item drawer-control__item_close cursor-pointer"
      >
        <img src="./img/drawer/close-arrow.svg" alt="" />
      </button>
      <button
        title="Make full"
        onClick={() => makeDrawerFull(true)}
        className="drawer-control__item drawer-control__item_size cursor-pointer"
      >
        <img src="./img/drawer/resize.svg" alt="" />
      </button>
      <button
        title="Previous"
        disabled={
          loadingItem || dataSource?.length === 1 || sourceType === 'customer'
        } // todo, remove
        onClick={handlePrevElement}
        className="drawer-control__item drawer-control__item_up-arrow"
      >
        <img src="./img/drawer/up-arrow.svg" alt="" />
      </button>
      <button
        disabled={
          loadingItem || dataSource?.length === 1 || sourceType === 'customer'
        } // todo, remove
        title="Next"
        onClick={handleNextElement}
        className="drawer-control__item drawer-control__item_down-arrow"
      >
        <img src="./img/drawer/down-arrow.svg" alt="" />
      </button>
    </div>
  );
}

export default DrawerControl;
