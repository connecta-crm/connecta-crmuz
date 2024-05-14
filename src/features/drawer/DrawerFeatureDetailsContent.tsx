import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { CONDITION_TYPES, TRAILER_TYPES } from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { getLeadData } from '../leads/leadSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import ArrowIcon from './feature-details/ArrowIcon';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatDestinationInner from './feature-details/FeatDestinationInner';
import FeatEstShipDateInner from './feature-details/FeatEstShipDateInner';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';
import FeatOriginInner from './feature-details/FeatOriginInner';
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
    leadVehicles,
  } = useAppSelector(getLeadData);

  const renderLeadVehicles = (): CollapseProps['items'] => {
    return leadVehicles.map((vehicle, index) => ({
      key: String(index + 20),
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel
              label={index === 0 ? 'Vehicle' : `Vehicle #${index + 1}`}
              icon="car"
            />
            {openInnerPanels?.includes(String(index + 20)) ? (
              <FeatItemOpen
                keyValue={String(index + 20)}
                feature="lead"
                featureItemField="leadVehicles"
                addRemoveBtn={index === 0 ? 'add' : 'remove'}
                featureItemData={vehicle}
              />
            ) : (
              <FeatItemClose
                keyValue={String(index + 20)}
                label={`${vehicle.vehicleYear} ${vehicle.vehicle?.mark.name || ''} ${vehicle.vehicle?.name || ''}`}
              />
            )}
            <ArrowIcon keyValue={String(index + 20)} />
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatVehicleInner vehicleIndex={index} vehicleItem={vehicle} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    }));
  };

  const items: CollapseProps['items'] = [
    {
      key: '2',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Condition" icon="dvigatel" />
            {openInnerPanels?.includes('2') ? (
              <FeatItemOpen
                keyValue="2"
                feature="lead"
                featureItemField="condition"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="2"
                textWithBg={true}
                label={
                  CONDITION_TYPES.find((type) => type.value === condition)
                    ?.label || undefined
                }
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatConditionInner feature="lead" keyValue="2" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
      className: 'mb-12',
    },
    {
      key: '3',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Origin" icon="origin" />
            {openInnerPanels?.includes('3') ? (
              <FeatItemOpen
                keyValue={'3'}
                feature="lead"
                featureItemField="origin"
              />
            ) : (
              <FeatItemClose keyValue={'3'} label={originName} />
            )}
            <ArrowIcon keyValue={'3'} />
          </div>
        </div>
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
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Destination" icon="destination" />
            {openInnerPanels?.includes('4') ? (
              <FeatItemOpen
                keyValue="4"
                feature="lead"
                featureItemField="destination"
              />
            ) : (
              <FeatItemClose keyValue="4" label={destinationName} />
            )}
            <ArrowIcon keyValue={'4'} />
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatDestinationInner />
        </DrawerFeatureRow>
      ),
      showArrow: false,
      className: 'mb-12',
    },
    {
      key: '5',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Trailer Type" icon="trailer" />
            {openInnerPanels?.includes('5') ? (
              <FeatItemOpen
                keyValue="5"
                feature="lead"
                featureItemField="trailerType"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="5"
                label={
                  TRAILER_TYPES.find((type) => type.value === trailerType)
                    ?.label
                }
                textWithBg={true}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatTrailertypeInner feature="lead" keyValue="5" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '6',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Est. ship date" icon="date" />
            {openInnerPanels?.includes('6') ? (
              <FeatItemOpen
                keyValue="6"
                feature="lead"
                featureItemField="dateEstShip"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="6"
                label={formatDate(dateEstShip ? dateEstShip : '')}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatEstShipDateInner feature="lead" keyValue="6" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
      className: 'mb-12',
    },
    {
      key: '7',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Source" icon="source" />
            {openInnerPanels?.includes('7') ? (
              <FeatItemOpen
                keyValue="7"
                feature="lead"
                featureItemField="source"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="7"
                label={sourceName}
                textWithBg={true}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatSourceInner feature="lead" keyValue="7" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '8',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Total tariff" icon="total-tariff" />
            {openInnerPanels?.includes('8') ? (
              <FeatItemOpen
                keyValue="8"
                feature="lead"
                featureItemField="price"
              />
            ) : (
              <FeatItemClose keyValue="8" label={'$' + String(totalTariff)} />
            )}
            <ArrowIcon keyValue={'8'} />
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatTotalTariffInner keyValue="8" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '9',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Reservation" icon="reservation" />
            {openInnerPanels?.includes('9') ? (
              <FeatItemOpen
                keyValue="9"
                feature="lead"
                featureItemField="reservationPrice"
              />
            ) : (
              <FeatItemClose
                keyValue="9"
                label={'$' + String(reservationPrice)}
              />
            )}
            <ArrowIcon keyValue={'9'} />
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatTotalTariffInner keyValue="9" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
  ];

  const vehicleItems = renderLeadVehicles();
  const mergeItems = vehicleItems?.concat(items);

  return (
    <div className="box-header-inner">
      <Collapse
        activeKey={openInnerPanels}
        ghost
        collapsible="icon"
        onChange={onChangeInnerCollapse}
        items={mergeItems}
      />
    </div>
  );
}

export default DrawerFeatureDetailsContent;
