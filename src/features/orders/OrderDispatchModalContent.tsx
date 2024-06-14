import { Button, Collapse, CollapseProps, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import FeatCarrierInfoInner from '../drawer/feature-date/FeatCarrierInfoInner';
import FeatDateInner from '../drawer/feature-date/FeatDateInner';
import { getOrderData, updateField as updateOrderField } from './orderSlice';

function OrderDispatchModalContent() {
  const orderData = useAppSelector(getOrderData);
  const dispatch = useDispatch();

  const handleChange = (field: string, value: string) => {
    dispatch(updateOrderField({ field, value }));
  };

  const itemsForCarrierInfo: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Carrier company info</span>
          <div className="d-flex align-center">
            <div className="detail__btns d-flex align-center pr-0">
              <Button
                className="ml-10"
                type="primary"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                disabled
              >
                Import from CD
              </Button>
              <div
                onClick={(e) => e.stopPropagation()}
                className="box-header__more ml-10"
              >
                <img src="./img/drawer/more-2.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      ),
      // children: <OrderDispatchModalCarrierItem />,
      children: <FeatCarrierInfoInner sourceType="order" />,
    },
  ];

  const itemsForCarrierDate: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Date</span>
        </div>
      ),
      children: <FeatDateInner sourceType="order" />,
      className: 'feature-drawer__item',
    },
  ];

  const itemsForCarrierPayment: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Payment</span>
        </div>
      ),
      children: (
        <>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Total tariff</div>
            <Input
              value={orderData.payments?.paymentTotalTariff}
              defaultValue={orderData.payments?.paymentTotalTariff}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChange('payments.paymentTotalTariff', e.target.value)
              }
            />
          </div>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Paid Reservation</div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              ${orderData.payments?.paymentPaidReservation}
            </div>
          </div>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Reservation</div>
            <Input
              value={orderData.payments?.paymentReservation}
              defaultValue={orderData.payments?.paymentReservation}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChange('payments.paymentReservation', e.target.value)
              }
            />
          </div>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Carrier pay</div>
            <Input
              value={orderData.payments?.paymentCarrierPay}
              defaultValue={orderData.payments?.paymentCarrierPay}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChange('payments.paymentCarrierPay', e.target.value)
              }
            />
          </div>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">COD to carrier</div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              ${orderData.payments?.paymentCodToCarrier}
            </div>
          </div>
        </>
      ),
      className: 'feature-drawer__item',
    },
  ];

  return (
    <div className="modal__row dispatch-modal">
      <div className="modal__col p-0">
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForCarrierInfo}
        />
      </div>
      <div className="modal__col p-0">
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForCarrierDate}
        />
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForCarrierPayment}
        />
      </div>
    </div>
  );
}

export default OrderDispatchModalContent;
