import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import {
  LeadData,
  LeadVehicle,
  OrderData,
  OrderVehicle,
  QuoteData,
  QuoteVehicle,
} from '../../models';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import {
  CONDITION_TYPES,
  LOCATION_TYPES,
  TRAILER_TYPES,
} from '../../utils/constants';
import { formatDate } from '../../utils/helpers';
import { getLeadData } from '../leads/leadSlice';
import {
  isLeadData,
  isOrderData,
  isQuoteData,
} from '../leads/useCheckTypeData';
import { getOrderData } from '../orders/orderSlice';
import { getQuoteData } from '../quotes/quoteSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import ArrowIcon from './feature-details/ArrowIcon';
import FeatCDCMNotes from './feature-details/FeatCDCMNotes';
import FeatConditionInner from './feature-details/FeatConditionInner';
import FeatDestinationInner from './feature-details/FeatDestinationInner';
import FeatEstShipDateInner from './feature-details/FeatEstShipDateInner';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';
import FeatLocationtypeInner from './feature-details/FeatLocationtypeInner';
import FeatOriginInner from './feature-details/FeatOriginInner';
import FeatSourceInner from './feature-details/FeatSourceInner';
import FeatTotalTariffInner from './feature-details/FeatTotalTariffInner';
import FeatTrailertypeInner from './feature-details/FeatTrailertypeInner';
import FeatVehicleInner from './feature-details/FeatVehicleInner';

const extractCommonData = (data: QuoteData | LeadData | OrderData) => {
  const {
    condition,
    originName,
    destinationName,
    trailerType,
    dateEstShip,
    source,
    price: totalTariff,
    reservationPrice,
  } = data;

  let leadVehicles, quoteVehicles, orderVehicles, locationType;

  if (isLeadData(data)) {
    leadVehicles = data.leadVehicles;
  }

  if (isQuoteData(data)) {
    quoteVehicles = data.quoteVehicles;
  }

  if (isOrderData(data)) {
    orderVehicles = data.orderVehicles;
    locationType = data.locationType;
  }

  return {
    condition,
    originName,
    destinationName,
    trailerType,
    locationType,
    dateEstShip,
    sourceName: source?.name,
    totalTariff,
    reservationPrice,
    leadVehicles,
    quoteVehicles,
    orderVehicles,
  };
};

function DrawerFeatureDetailsContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);
  let selectedData = null;

  switch (sourceType) {
    case 'lead':
      selectedData = leadData;
      break;
    case 'quote':
      selectedData = quoteData;
      break;
    case 'order':
      selectedData = orderData;
      break;
  }

  if (!selectedData) {
    return;
  }

  const {
    condition,
    originName,
    destinationName,
    trailerType,
    locationType,
    dateEstShip,
    sourceName,
    totalTariff,
    reservationPrice,
    leadVehicles,
    quoteVehicles,
    orderVehicles,
  } = extractCommonData(selectedData);

  let vehiclesList: LeadVehicle[] | QuoteVehicle[] | OrderVehicle[] | undefined,
    vehicleFieldType: 'leadVehicles' | 'quoteVehicles' | 'orderVehicles';

  switch (sourceType) {
    case 'lead':
      vehiclesList = leadVehicles;
      vehicleFieldType = 'leadVehicles';
      break;
    case 'quote':
      vehiclesList = quoteVehicles;
      vehicleFieldType = 'quoteVehicles';
      break;
    case 'order':
      vehiclesList = orderVehicles;
      vehicleFieldType = 'orderVehicles';
      break;
  }

  const renderVehicles = (): CollapseProps['items'] => {
    if (vehiclesList?.length) {
      return vehiclesList?.map(
        (
          vehicle: LeadVehicle | QuoteVehicle | OrderVehicle,
          index: number,
        ) => ({
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
                    feature={sourceType}
                    featureItemField={vehicleFieldType}
                    addRemoveBtn={index === 0 ? 'add' : 'remove'}
                    featureItemData={vehicle}
                  />
                ) : (
                  <FeatItemClose
                    feature={sourceType}
                    keyValue={String(index + 20)}
                    tooltip={true}
                    label={`${vehicle.vehicleYear} ${vehicle.vehicle?.mark.name || ''} ${vehicle.vehicle?.name || ''}`}
                  />
                )}
                <ArrowIcon keyValue={String(index + 20)} />
              </div>
            </div>
          ),
          children: (
            <DrawerFeatureRow>
              <FeatVehicleInner
                feature={sourceType}
                vehicleIndex={index}
                vehicleItem={vehicle}
              />
            </DrawerFeatureRow>
          ),
          showArrow: false,
        }),
      );
    }
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
                feature={sourceType}
                featureItemField="condition"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="2"
                textWithBg={true}
                feature={sourceType}
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
          <FeatConditionInner feature={sourceType} keyValue="2" />
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
                feature={sourceType}
                featureItemField="origin"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue={'3'}
                tooltip={true}
                label={originName}
              />
            )}
            <ArrowIcon keyValue="3" />
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatOriginInner feature={sourceType} keyValue="3" />
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
                feature={sourceType}
                featureItemField="destination"
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="4"
                tooltip={true}
                label={destinationName}
              />
            )}
            <ArrowIcon keyValue={'4'} />
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatDestinationInner feature={sourceType} keyValue="4" />
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
                feature={sourceType}
                featureItemField="trailerType"
                series={false}
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
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
          <FeatTrailertypeInner feature={sourceType} keyValue="5" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '05',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Location type" icon="origin" />
            {openInnerPanels?.includes('05') ? (
              <FeatItemOpen
                keyValue="05"
                feature={sourceType}
                featureItemField="trailerType"
                series={false}
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="05"
                label={
                  LOCATION_TYPES.find((type) => type.value === locationType)
                    ?.label
                }
                textWithBg
                tooltip
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatLocationtypeInner feature={sourceType} keyValue="05" />
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
                feature={sourceType}
                featureItemField="dateEstShip"
                series={false}
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
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
          <FeatEstShipDateInner feature={sourceType} keyValue="6" />
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
                feature={sourceType}
                featureItemField="source"
                series={false}
              />
            ) : (
              <FeatItemClose
                feature={sourceType}
                keyValue="7"
                label={sourceName || 'unknown'}
                textWithBg={true}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatSourceInner feature={sourceType} keyValue="7" />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    ...(!openInnerPanels.includes('9')
      ? [
          {
            key: '8',
            label: !openInnerPanels.includes('8') ? (
              <div className="detail detail-origin">
                <div className="detail__header d-flex align-center justify-between">
                  <FeatItemLabel label="Total tariff" icon="total-tariff" />
                  {openInnerPanels?.includes('8') ? (
                    <FeatItemOpen
                      keyValue="8"
                      feature={sourceType}
                      featureItemField="price"
                      series={false}
                    />
                  ) : (
                    <FeatItemClose
                      feature={sourceType}
                      keyValue="8"
                      label={'$' + String(totalTariff)}
                      series={false}
                    />
                  )}
                </div>
              </div>
            ) : null,
            children: (
              <DrawerFeatureRow>
                <FeatTotalTariffInner keyValue="8" feature={sourceType} />
              </DrawerFeatureRow>
            ),
            showArrow: false,
          },
        ]
      : []),
    ...(!openInnerPanels.includes('8')
      ? [
          {
            key: '9',
            label: !openInnerPanels.includes('9') ? (
              <div className="detail detail-origin">
                <div className="detail__header d-flex align-center justify-between">
                  <FeatItemLabel label="Reservation" icon="reservation" />
                  {openInnerPanels?.includes('9') ? (
                    <FeatItemOpen
                      keyValue="9"
                      feature={sourceType}
                      featureItemField="reservationPrice"
                      series={false}
                    />
                  ) : (
                    <FeatItemClose
                      feature={sourceType}
                      keyValue="9"
                      label={'$' + String(reservationPrice)}
                      series={false}
                    />
                  )}
                </div>
              </div>
            ) : null,
            children: (
              <DrawerFeatureRow>
                <FeatTotalTariffInner keyValue="9" feature={sourceType} />
              </DrawerFeatureRow>
            ),
            showArrow: false,
          },
        ]
      : []),
    // * CD/CM notes for ORDER
    {
      key: '13',
      label: <FeatCDCMNotes keyValue="13" sourceType={sourceType} />,
      showArrow: false,
      className: 'detail__cdcm-note',
    },
  ];

  const vehicleItems = renderVehicles();
  const keysToFilterForOrder: string[] = ['13', '05'];

  const filteredItems: CollapseProps['items'] = items.filter(
    (item) =>
      !(keysToFilterForOrder.includes(item.key) && sourceType !== 'order') &&
      !(item.key === '6' && sourceType === 'order') &&
      !(item.key === '9' && sourceType === 'order') &&
      !(item.key === '8' && sourceType === 'order'),
  );

  const mergeItems = vehicleItems
    ? vehicleItems?.concat(filteredItems)
    : filteredItems;

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
