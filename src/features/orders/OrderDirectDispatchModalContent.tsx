import { Collapse, CollapseProps, Input, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CarrierData } from '../../models';
import { useAppSelector } from '../../store/hooks';
import {
  DISPATCH_CODE_METHOD,
  DISPATCH_PAID_BY,
  DISPATCH_PAYMENT_TERM,
  DISPATCH_PAYMENT_TYPE,
  DISPATCH_TERM_BEGINS,
} from '../../utils/constants';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import FeatDateInner from '../drawer/feature-date/FeatDateInner';
import { getOrderData, updateField as updateOrderField } from './orderSlice';

const initialDirectDispatchCarrierData: CarrierData & {
  city: string;
  state: string;
  zip: number;
} = {
  locationName: '',
  name: '', // company name
  address: '',
  mcNumber: '',
  contactName: '',
  phone: '',
  phone2: '',
  email: '',
  fax: '',
  status: '',
  location: null,

  city: '',
  zip: 0,
  state: '',
};

function OrderDirectDispatchModalContent() {
  const orderData = useAppSelector(getOrderData);
  const dispatch = useDispatch();

  const [carrierData, setCarrierData] = useState(
    initialDirectDispatchCarrierData,
  );

  const handleChange = (field: string, value: string) => {
    dispatch(updateOrderField({ field, value }));
  };

  const handleChangeCompanyInfo = (field: string, value: string) => {
    setCarrierData({ ...carrierData, [field]: value });
  };

  const handleChangeDispatch = (
    field: string,
    option:
      | {
          value: string;
          label: string;
        }
      | { value: string; label: string }[],
  ) => {
    if (!Array.isArray(option)) {
      const { value } = option;
      dispatch(
        updateOrderField({
          field,
          value,
        }),
      );
    }
  };

  const {
    dispatchCodMethod,
    dispatchPaidBy,
    dispatchPaymentTerm,
    dispatchPaymentType,
    dispatchTermBegins,
  } = orderData.dispatchData;

  const itemsForCarrierInfo: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Carrier company info</span>
          <div className="d-flex align-center">
            <div className="detail__btns d-flex align-center pr-0">
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
      children: (
        <>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Company</div>
            </div>
            <Input
              value={carrierData.name || ''}
              defaultValue={carrierData.name || ''}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChangeCompanyInfo('name', e.target.value)}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Location</div>
            </div>
            <Input
              value={carrierData.location || ''}
              defaultValue={carrierData.location || ''}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeCompanyInfo('location', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">MC number</div>
            </div>
            <Input
              value={carrierData.mcNumber || ''}
              defaultValue={carrierData.mcNumber || ''}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeCompanyInfo('mcNumber', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Address</div>
            </div>
            <Input
              value={carrierData.address}
              defaultValue={carrierData.address}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeCompanyInfo('address', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">City</div>
            </div>
            <Input
              value={carrierData.city}
              defaultValue={carrierData.city}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChangeCompanyInfo('city', e.target.value)}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">State</div>
            </div>
            <Input
              value={carrierData.state}
              defaultValue={carrierData.state}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChangeCompanyInfo('state', e.target.value)}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Zip</div>
            </div>
            <Input
              value={carrierData.zip}
              defaultValue={carrierData.zip}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChangeCompanyInfo('zip', e.target.value)}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Phone</div>
            </div>
            <Input
              value={carrierData.phone}
              defaultValue={carrierData.phone}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChangeCompanyInfo('phone', e.target.value)}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Phone #2</div>
            </div>
            <Input
              value={carrierData.phone2}
              defaultValue={carrierData.phone2}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeCompanyInfo('phone2', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Fax</div>
            </div>
            <Input
              value={carrierData.fax}
              defaultValue={carrierData.fax}
              size="small"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChangeCompanyInfo('fax', e.target.value)}
            />
          </div>
        </>
      ),
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
          {/* PAYMNET */}
          <div className="mb-20"></div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Will be paid by</div>
            </div>
            <Select
              value={dispatchPaidBy || ''}
              defaultValue={dispatchPaidBy || ''}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record) =>
                handleChangeDispatch('dispatchData.dispatchPaidBy', record)
              }
              options={DISPATCH_PAID_BY}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Payment Term</div>
            </div>
            <Select
              value={dispatchPaymentTerm || ''}
              defaultValue={dispatchPaymentTerm || ''}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record) =>
                handleChangeDispatch('dispatchData.dispatchPaymentTerm', record)
              }
              options={DISPATCH_PAYMENT_TERM}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Term Begins</div>
            </div>
            <Select
              value={dispatchTermBegins || ''}
              defaultValue={dispatchTermBegins || ''}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record) =>
                handleChangeDispatch('dispatchData.dispatchTermBegins', record)
              }
              options={DISPATCH_TERM_BEGINS}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">COD method</div>
            </div>
            <Select
              value={dispatchCodMethod || ''}
              defaultValue={dispatchCodMethod || ''}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record) =>
                handleChangeDispatch('dispatchData.dispatchCodMethod', record)
              }
              options={DISPATCH_CODE_METHOD}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Payment type</div>
            </div>
            <Select
              value={dispatchPaymentType || ''}
              defaultValue={dispatchPaymentType || ''}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record) =>
                handleChangeDispatch('dispatchData.dispatchPaymentType', record)
              }
              options={DISPATCH_PAYMENT_TYPE}
            />
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

export default OrderDirectDispatchModalContent;
