/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../../ui/Modal';
import {
  PAYMENT_BROKER_DIRECTIONS,
  PAYMENT_CARRIER_TYPES,
  PAYMENT_CHARGE_TYPES,
  PAYMENT_TYPES,
} from '../../../utils/constants';
import { useOrderPaymentCreate } from '../../orders/useOrderPaymentCreate';

export type CreatePaymentDataType = {
  name: null;
  quantity: number;
  amount: string;
  discount: string;
  paymentType: null;
  surchargeFeeRate: number;
  chargeType: string;
  direction: string;
  order: string;
};

const initialPaymentData: CreatePaymentDataType = {
  name: null,
  quantity: 1,
  amount: '',
  discount: '',
  paymentType: null,
  surchargeFeeRate: 0,
  chargeType: '',
  direction: '',
  order: '',
};

function TabCreatePaymentModal({ orderGuid, isOpenModal, onCloseModal }) {
  const [paymentData, setPaymentData] =
    useState<CreatePaymentDataType>(initialPaymentData);

  const { createOrderPayment, isLoading, error } = useOrderPaymentCreate();

  useEffect(() => {
    if (!isLoading && !error) {
      onCloseModal();
      setPaymentData(initialPaymentData);
    }
  }, [isLoading, error]);

  // useEffect(() => {

  // }, [paymentData]);

  return (
    <Modal
      title="Create a payment"
      width="small"
      padding="15"
      open={isOpenModal}
      onCancel={onCloseModal}
      loading={isLoading}
      onSave={() =>
        createOrderPayment({
          ...paymentData,
          order: orderGuid,
          surchargeFeeRate: Number(paymentData.surchargeFeeRate),
          quantity: Number(paymentData.quantity),
        })
      }
    >
      <>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Name</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select name"
            onChange={(name) => setPaymentData((prev) => ({ ...prev, name }))}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            value={paymentData.name}
            options={PAYMENT_CARRIER_TYPES}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Quantity</div>
          </div>
          <Input
            size="small"
            placeholder="Enter quantity"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            value={paymentData.quantity}
            type="number"
            onChange={({ target: { value: quantity } }) =>
              setPaymentData((prev) => ({
                ...prev,
                quantity: Number(quantity),
                amount:
                  prev.paymentType === 'credit_card'
                    ? String(Number(quantity) + (Number(quantity) * 5) / 100)
                    : prev.amount,
              }))
            }
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Amount</div>
          </div>
          <Input
            size="small"
            placeholder="$0.000.00"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            value={paymentData.amount}
            onChange={({ target: { value: amount } }) =>
              setPaymentData((prev) => ({
                ...prev,
                amount,
              }))
            }
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Discount</div>
          </div>
          <Input
            size="small"
            placeholder="$0.00"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            value={paymentData.discount}
            onChange={({ target: { value: discount } }) =>
              setPaymentData((prev) => ({
                ...prev,
                discount,
              }))
            }
          />
        </div>
        <br />
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Payment type</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select payment type"
            value={paymentData.paymentType}
            onChange={(paymentType) => {
              if (paymentType === 'credit_card') {
                setPaymentData((prev) => ({
                  ...prev,
                  paymentType,
                  surchargeFeeRate: 5,
                  amount: String(
                    Number(prev.quantity) + (prev.quantity * 5) / 100,
                  ),
                }));
              } else {
                setPaymentData((prev) => ({
                  ...prev,
                  paymentType,
                  surchargeFeeRate: 0,
                  amount: '',
                }));
              }
            }}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={PAYMENT_TYPES}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Surcharge fee rate</div>
          </div>
          <Input
            size="small"
            placeholder="Empty"
            type="number"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            value={paymentData.surchargeFeeRate}
            onChange={({ target: { value: surchargeFeeRate } }) =>
              setPaymentData((prev) => ({
                ...prev,
                surchargeFeeRate,
              }))
            }
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Charge type</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select charge type"
            onChange={(chargeType) =>
              setPaymentData((prev) => ({ ...prev, chargeType }))
            }
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            options={PAYMENT_CHARGE_TYPES}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Direction</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select direction"
            onChange={() => {}}
            style={{ width: 218, float: 'inline-end', height: 24 }}
            loading={false}
            onChange={(direction) =>
              setPaymentData((prev) => ({ ...prev, direction }))
            }
            value={paymentData.direction}
            options={PAYMENT_BROKER_DIRECTIONS}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Total amount</div>
          </div>
          <div style={{ width: 218, float: 'inline-end', height: 24 }}>
            $
            {Number(paymentData.amount) +
              Number(paymentData.surchargeFeeRate) -
              Number(paymentData.discount)}
          </div>
        </div>
      </>
    </Modal>
  );
}

export default TabCreatePaymentModal;
