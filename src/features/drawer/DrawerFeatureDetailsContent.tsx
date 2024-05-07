import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { formatDate } from '../../utils/helpers';
import { getLeadData } from '../leads/leadSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatDestinationInner from './feature-details/FeatDestinationInner';
import FeatEstShipDateInner from './feature-details/FeatEstShipDateInner';
import FeatItemHeader from './feature-details/FeatItemHeader';
import FeatOriginInner from './feature-details/FeatOriginInner';
import FeatReservationInner from './feature-details/FeatReservationInner';
import FeatSourceInner from './feature-details/FeatSourceInner';
import FeatTotalTariffInner from './feature-details/FeatTotalTariffInner';
import FeatTrailertypeInner from './feature-details/FeatTrailertypeInner';
import FeatVehicleInner from './feature-details/FeatVehicleInner';

function DrawerFeatureDetailsContent() {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const {
    condition,
    originName,
    destinationName,
    trailerType,
    dateEstShip,
    source: { name: sourceName },
    price: totalTariff,
    reservationPrice,
  } = useAppSelector(getLeadData);

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <FeatItemHeader
          keyValue={'1'}
          itemCloseLabel={condition}
          itemLabel="Vehicle"
          featureItemField="condition"
          icon="car"
          feature="lead"
          hasAddAction={true}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatVehicleInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '2',
      label: (
        <FeatItemHeader
          keyValue={'2'}
          itemCloseLabel={condition}
          itemLabel="Condition"
          icon="dvigatel"
          feature="lead"
          featureItemField="condition"
          textWithBg={true}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatConditionInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '3',
      label: (
        <FeatItemHeader
          keyValue={'3'}
          itemCloseLabel={originName}
          itemLabel="Origin"
          icon="origin"
          feature="lead"
          featureItemField="origin"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatOriginInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '4',
      label: (
        <FeatItemHeader
          keyValue={'4'}
          itemCloseLabel={destinationName}
          itemLabel="Destination"
          icon="destination"
          feature="lead"
          featureItemField="destination"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatDestinationInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '5',
      label: (
        <FeatItemHeader
          keyValue={'5'}
          itemCloseLabel={trailerType}
          itemLabel="Trailer Type"
          icon="trailer"
          feature="lead"
          featureItemField="trailerType"
          textWithBg={true}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatTrailertypeInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '6',
      label: (
        <FeatItemHeader
          keyValue={'6'}
          itemCloseLabel={formatDate(dateEstShip)}
          itemLabel="Est. ship date"
          icon="date"
          feature="lead"
          featureItemField="dateEstShip"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatEstShipDateInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '7',
      label: (
        <FeatItemHeader
          keyValue={'7'}
          itemCloseLabel={sourceName}
          itemLabel="Source"
          icon="source"
          feature="lead"
          featureItemField="source"
          textWithBg={true}
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatSourceInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '8',
      label: (
        <FeatItemHeader
          keyValue="8"
          itemCloseLabel={'$' + String(totalTariff)}
          itemLabel="Total tariff"
          icon="total-tariff"
          feature="lead"
          featureItemField="price"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatTotalTariffInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '9',
      label: (
        <FeatItemHeader
          keyValue="9"
          itemCloseLabel={'$' + String(reservationPrice)}
          itemLabel="Reservation"
          icon="reservation"
          feature="lead"
          featureItemField="reservationPrice"
        />
      ),
      children: (
        <DrawerFeatureRow>
          <FeatReservationInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
  ];

  // Agar condition yoki boshqa null bolsa, uni hide qilish!
  const updatedItems = items.filter((item) => {
    if (!condition) {
      return item.key !== '2';
    }
    return item;
  });

  return (
    <div className="box-header-inner">
      <Collapse
        activeKey={openInnerPanels}
        ghost
        collapsible="icon"
        onChange={onChangeInnerCollapse}
        items={updatedItems}
      />
    </div>
  );
}

export default DrawerFeatureDetailsContent;
