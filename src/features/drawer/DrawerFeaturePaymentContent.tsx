/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppSelector } from '../../store/hooks';
import { DrawerSourceType } from '../../ui/Drawer';
import { getOrderData } from '../orders/orderSlice';
import DrawerFeatureRow from './DrawerFeatureRow';
import FeatItemClose from './feature-details/FeatItemClose';
import FeatItemLabel from './feature-details/FeatItemLabel';
import FeatItemOpen from './feature-details/FeatItemOpen';
import FeatPayCarrierPayInner from './feature-payment/FeatPayCarrierPayInner';
import FeatPayCodToCarrierInner from './feature-payment/FeatPayCodToCarrierInner';
import FeatPayPaidReservationInner from './feature-payment/FeatPayPaidReservationInner';
import FeatPayPaidToCarrierInner from './feature-payment/FeatPayPaidToCarrierInner';
import FeatPayReservationInner from './feature-payment/FeatPayReservationInner';
import FeatPayTotalTarifInner from './feature-payment/FeatPayTotalTarifInner';

function DrawerFeaturePaymentContent({ sourceType }: DrawerSourceType) {
  const { openInnerPanels, onChangeInnerCollapse } = useDrawerFeature();

  const orderData = useAppSelector(getOrderData);
  let selectedData = null;

  switch (sourceType) {
    case 'order':
      selectedData = orderData;
      break;
  }

  if (!selectedData) {
    return;
  }

  const {
    payments: { paymentTotalTariff },
    payments: { paymentReservation },
    payments: { paymentPaidReservation },
    payments: { paymentCarrierPay },
    payments: { paymentCodToCarrier },
    payments: { paymentPaidToCarrier },
  } = selectedData;

  const items: CollapseProps['items'] = [
    {
      key: '30',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Total tarif" icon="none" />
            {openInnerPanels?.includes('30') ? (
              <FeatItemOpen
                keyValue="30"
                feature={sourceType}
                featureItemField="payments"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="30"
                feature={sourceType}
                label={'$' + String(paymentTotalTariff)}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPayTotalTarifInner keyValue="30" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '31',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Reservation" icon="none" />
            {openInnerPanels?.includes('31') ? (
              <FeatItemOpen
                keyValue="31"
                feature={sourceType}
                featureItemField="payments"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="31"
                feature={sourceType}
                label={'$' + String(paymentReservation)}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPayReservationInner keyValue="31" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '32',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Paid Reservation" icon="none" />
            {openInnerPanels?.includes('32') ? (
              <FeatItemOpen
                keyValue="32"
                feature={sourceType}
                featureItemField="payments"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="32"
                feature={sourceType}
                label={'$' + String(paymentPaidReservation)}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPayPaidReservationInner keyValue="32" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '33',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Carrier pay" icon="none" />
            {openInnerPanels?.includes('33') ? (
              <FeatItemOpen
                keyValue="33"
                feature={sourceType}
                featureItemField="payments"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="33"
                feature={sourceType}
                label={'$' + String(paymentCarrierPay)}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPayCarrierPayInner keyValue="33" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '34',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="COD to carrier" icon="none" />
            {openInnerPanels?.includes('34') ? (
              <FeatItemOpen
                keyValue="34"
                feature={sourceType}
                featureItemField="payments"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="34"
                feature={sourceType}
                label={`$${(paymentTotalTariff || 0) - (paymentReservation || 0)}`}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPayCodToCarrierInner keyValue="34" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '35',
      label: (
        <div className="detail detail-origin">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Paid to carrier" icon="none" />
            {openInnerPanels?.includes('35') ? (
              <FeatItemOpen
                keyValue="35"
                feature={sourceType}
                featureItemField="payments"
                series={false}
              />
            ) : (
              <FeatItemClose
                keyValue="35"
                feature={sourceType}
                label={'$' + String(paymentPaidToCarrier)}
                series={false}
              />
            )}
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <FeatPayPaidToCarrierInner keyValue="35" feature={sourceType} />
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
  ];

  return (
    <div className="box-header-inner">
      <Collapse
        activeKey={openInnerPanels}
        ghost
        collapsible="icon"
        onChange={onChangeInnerCollapse}
        items={items}
      />
    </div>
  );
}

export default DrawerFeaturePaymentContent;
