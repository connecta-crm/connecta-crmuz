/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from 'antd';
import { useState } from 'react';
import Modal from '../../../ui/Modal';
import {
  PAYMENT_BROKER_DIRECTIONS,
  PAYMENT_CARRIER_TYPES,
  PAYMENT_CHARGE_TYPES,
  PAYMENT_TYPES,
} from '../../../utils/constants';
import { useOrderPaymentAttachs } from '../../orders/useOrderPaymentAttachs';

export type CreatePaymentCreditCardDataType = {
  cardNumber: string;
  firstName: string;
  lastName: string;
  expirationDate: string;
  cvv: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  orderPayment: number;
  order: string;
};

const initialPaymentCreditCardData: CreatePaymentCreditCardDataType = {
  cardNumber: '',
  firstName: '',
  lastName: '',
  expirationDate: '',
  cvv: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  orderPayment: 0,
  order: '',
};

function TabPaymentViewModal({
  data,
  orderGuid,
  isOpenModal,
  onCloseModal,
  onOpenRefundModal,
}) {
  const [isAddNewCardAction, setAddNewCardAction] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [chargePayment, setChargePayment] = useState({
    amount: '',
  });

  const { orderPaymentAttachs, isLoadingOrderPaymentAttachs } =
    useOrderPaymentAttachs(data.id, data.status === 'paid');

  const handleOpenRefundModal = () => {
    console.log('orderPaymentAttachs', orderPaymentAttachs); // todo, send specific transactionId
    const transactionId = orderPaymentAttachs.find(
      (item) => !!item.transactionId,
    );
    onCloseModal();
    onOpenRefundModal(transactionId);
  };

  return (
    <Modal
      title="Payment"
      width="small"
      padding="0"
      open={isOpenModal}
      hasEdit
      onCancel={() => {
        onCloseModal();
        setAddNewCardAction(false);
      }}
    >
      <>
        <div style={{ padding: 15, paddingBottom: 0 }}>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Name</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {
                PAYMENT_CARRIER_TYPES.find((item) => item.value === data.name)
                  ?.label
              }
            </div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Quantity</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {data.quantity}
            </div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Amount</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {data?.amount}
            </div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Discount</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              ${data.discount}
            </div>
          </div>
          <br />
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Payment type</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {
                PAYMENT_TYPES.find((item) => item.value === data.paymentType)
                  ?.label
              }
            </div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Surcharge fee rate</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {data.surchargeFeeRate}%
            </div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Charge type</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {
                PAYMENT_CHARGE_TYPES.find(
                  (item) => item.value === data.chargeType,
                )?.label
              }
            </div>
          </div>
          <div className="d-flex justify-between mb-20">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Direction</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {
                PAYMENT_BROKER_DIRECTIONS.find(
                  (item) => item.value === data.direction,
                )?.label
              }
            </div>
          </div>
          <div className="d-flex justify-between mb-20">
            <div className="d-flex">
              <div className="modal__input-label pl-0">Total amount</div>
            </div>
            <div style={{ width: 215, float: 'inline-end', height: 24 }}>
              {data?.totalAmount || 'backdan: +totalAmount'}
            </div>
          </div>
          <Button
            type="primary"
            style={{
              width: '100%',
              cursor: 'inherit',
              backgroundColor: 'rgb(66, 125, 157)',
            }}
            size="middle"
            className="mb-10"
          >
            <b>Paid</b>
          </Button>
          <Button
            type="primary"
            ghost
            style={{
              width: '100%',
            }}
            size="middle"
            className="mb-20"
            onClick={handleOpenRefundModal}
          >
            <b>Refund</b>
          </Button>
          {data.status === 'paid' &&
            !isLoadingOrderPaymentAttachs &&
            orderPaymentAttachs?.map((attach, index) => (
              <div key={index} className="">
                <div className="mb-15">
                  <h3 className="text-center f-16 font-bold">
                    This transaction has been recorder via{' '}
                    <b style={{ color: '#427d9d' }}>
                      {
                        PAYMENT_TYPES.find(
                          (item) => item.value === data.paymentType,
                        )?.label
                      }
                    </b>
                  </h3>
                  <div className="d-flex align-center justify-between f-15">
                    <p style={{ color: '#086ed6', fontSize: 16 }}>Successful</p>{' '}
                    <span style={{ color: '#02a858' }}>${attach.amount}</span>
                    <div style={{ color: '#21232c' }}> {data.executedOn}</div>
                    {/* 03/14/2024 03:23 PM */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </>
    </Modal>
  );
}

export default TabPaymentViewModal;
