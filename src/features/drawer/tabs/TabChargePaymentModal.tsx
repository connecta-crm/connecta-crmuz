/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Collapse, CollapseProps, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../../ui/Modal';
import {
  PAYMENT_BROKER_DIRECTIONS,
  PAYMENT_CARRIER_TYPES,
  PAYMENT_CHARGE_TYPES,
  PAYMENT_TYPES,
} from '../../../utils/constants';
import { useOrderAttachCreate } from '../../orders/useOrderAttachCreate';
import { useOrderCreditCards } from '../../orders/useOrderCreditCards';
import { useOrderPaymentCreditCardCreate } from '../../orders/useOrderPaymentCreditCardCreate';
import TabCreditCardItem from './TabCreditCardItem';

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

function TabChargePaymentModal({ data, orderGuid, isOpenModal, onCloseModal }) {
  const [isAddNewCardAction, setAddNewCardAction] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [chargePayment, setChargePayment] = useState({
    amount: '',
  });
  const [paymentCreditCardData, setPaymentCreditCardData] =
    useState<CreatePaymentCreditCardDataType>(initialPaymentCreditCardData);

  const { orderCreditCards, isLoadingOrderCreditCards } = useOrderCreditCards(
    data.orderPayment,
  );
  const {
    createOrderPaymentCreditCard,
    isLoading: isLoadingCreateCreditCard,
    createdOrderPaymentCreditCardData,
  } = useOrderPaymentCreditCardCreate();

  const {
    createOrderAttach,
    isLoading: isLoadingCreateOrderAttach,
    createdOrderAttachData,
  } = useOrderAttachCreate();

  const handleSaveCard = () => {
    createOrderPaymentCreditCard({
      ...paymentCreditCardData,
      orderPayment: data.orderPayment,
      order: orderGuid,
    });
  };

  const handleCharge = () => {
    const { amount } = chargePayment;
    if (!selectedCardId) {
      return message.warning('Credit card is not provided!');
    }
    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('orderPayment', data.id);
    formData.append('creditCard', selectedCardId);
    createOrderAttach(formData);
  };

  useEffect(() => {
    if (data) {
      setChargePayment(data);
      setPaymentCreditCardData(initialPaymentCreditCardData);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoadingCreateCreditCard && createdOrderPaymentCreditCardData) {
      setAddNewCardAction(false);
    }
  }, [isLoadingCreateCreditCard, createdOrderPaymentCreditCardData]);

  useEffect(() => {
    if (!isLoadingCreateOrderAttach && createdOrderAttachData) {
      onCloseModal();
      setAddNewCardAction(false);
      setSelectedCardId(null);
    }
  }, [isLoadingCreateOrderAttach, createdOrderAttachData]);

  const renderCreditCards = (): CollapseProps['items'] => {
    if (orderCreditCards?.length) {
      return orderCreditCards
        ?.slice()
        .reverse()
        ?.map((creditCard, index: number) => ({
          key: String(index + 1),
          label: (
            <div className="box-header d-flex align-center justify-between">
              <TabCreditCardItem
                key={creditCard.id}
                creditCard={creditCard}
                index={index}
                selectedCardId={selectedCardId}
                onSelectCard={setSelectedCardId}
              />
            </div>
          ),
          children: (
            <>
              <div
                className="modal__input-label mb-5"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  borderBottom: '1px solid #164863',
                }}
              >
                Card details
              </div>
              <div className="mb-15">
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">Card number</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.cardNumber}
                    disabled
                  />
                </div>
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">First name</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.firstName}
                    disabled
                  />
                </div>
                <div className="d-flex justify-between">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">Last name</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.lastName}
                    disabled
                  />
                </div>
              </div>
              <div className="mb-15">
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">
                      Expiration date
                    </div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.expirationDate}
                    disabled
                  />
                </div>
                <div className="d-flex justify-between">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">Security code</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.cvv}
                    disabled
                  />
                </div>
              </div>
              <div
                className="modal__input-label mb-5"
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  borderBottom: '1px solid #164863',
                }}
              >
                Billing address
              </div>
              <div className="">
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">Address</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.billingAddress}
                    disabled
                  />
                </div>
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">City</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.billingCity}
                    disabled
                  />
                </div>
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">State</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.billingState}
                    disabled
                  />
                </div>
                <div className="d-flex justify-between mb-5">
                  <div className="d-flex">
                    <div className="modal__input-label pl-0">Zip</div>
                  </div>
                  <Input
                    size="small"
                    style={{ width: 218, float: 'inline-end', height: 24 }}
                    value={creditCard.billingZip}
                    disabled
                  />
                </div>
              </div>
            </>
          ),
          className: 'charge-payment',
        }));
    }
  };

  return (
    <Modal
      title="Charge a payment"
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
            <Input
              size="small"
              type="number"
              placeholder="$0.000.00"
              style={{ width: 218, float: 'inline-end', height: 24 }}
              value={chargePayment.amount}
              onChange={({ target: { value: amount } }) =>
                setChargePayment((prev) => ({
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
          <Button
            type="primary"
            style={{ width: '100%' }}
            size="middle"
            disabled={
              !orderCreditCards?.length ||
              isLoadingOrderCreditCards ||
              !selectedCardId ||
              isLoadingCreateOrderAttach
            }
            loading={isLoadingCreateCreditCard || isLoadingCreateOrderAttach}
            onClick={handleCharge}
          >
            <b>{isLoadingOrderCreditCards ? '...' : 'Charge'}</b>
          </Button>
        </div>
        <br />
        <Collapse
          ghost
          collapsible="icon"
          defaultActiveKey={['1']}
          expandIcon={() => (
            <div className="box-header__arrow-bold cursor-inherit">
              <img src="./img/drawer/down-arrow-bold.svg" alt="" />
            </div>
          )}
          items={renderCreditCards()}
          expandIconPosition="end"
        />
        <hr />
        {isAddNewCardAction && (
          <div className="px-15 py-10 modal-create-card">
            <div
              className="modal__input-label mb-5"
              style={{
                fontWeight: 700,
                fontSize: 16,
                borderBottom: '1px solid #164863',
              }}
            >
              Card details
            </div>
            <div className="mb-15">
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">Card number</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.cardNumber}
                  onChange={({ target: { value: cardNumber } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      cardNumber,
                    }))
                  }
                />
              </div>
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">First name</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.firstName}
                  onChange={({ target: { value: firstName } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      firstName,
                    }))
                  }
                />
              </div>
              <div className="d-flex justify-between">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">Last name</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.lastName}
                  onChange={({ target: { value: lastName } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      lastName,
                    }))
                  }
                />
              </div>
            </div>
            <div className="mb-15">
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">Expiration date</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.expirationDate}
                  onChange={({ target: { value: expirationDate } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      expirationDate,
                    }))
                  }
                />
              </div>
              <div className="d-flex justify-between">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">Security code</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.cvv}
                  onChange={({ target: { value: cvv } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      cvv,
                    }))
                  }
                />
              </div>
            </div>
            <div
              className="modal__input-label mb-5"
              style={{
                fontWeight: 700,
                fontSize: 16,
                borderBottom: '1px solid #164863',
              }}
            >
              Billing address
            </div>
            <div className="">
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">Address</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.billingAddress}
                  onChange={({ target: { value: billingAddress } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      billingAddress,
                    }))
                  }
                />
              </div>
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">City</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.billingCity}
                  onChange={({ target: { value: billingCity } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      billingCity,
                    }))
                  }
                />
              </div>
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">State</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.billingState}
                  onChange={({ target: { value: billingState } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      billingState,
                    }))
                  }
                />
              </div>
              <div className="d-flex justify-between mb-5">
                <div className="d-flex">
                  <div className="modal__input-label pl-0">Zip</div>
                </div>
                <Input
                  size="small"
                  style={{ width: 218, float: 'inline-end', height: 24 }}
                  value={paymentCreditCardData.billingZip}
                  onChange={({ target: { value: billingZip } }) =>
                    setPaymentCreditCardData((prev) => ({
                      ...prev,
                      billingZip,
                    }))
                  }
                />
              </div>
            </div>
            <Button
              type="primary"
              style={{ width: '100%' }}
              size="middle"
              className="mt-10 mb-5"
              loading={isLoadingCreateCreditCard}
              disabled={isLoadingCreateCreditCard}
              onClick={handleSaveCard}
            >
              <b>Save</b>
            </Button>
          </div>
        )}
        {!isAddNewCardAction && (
          <div style={{ padding: 15 }}>
            <Button
              type="primary"
              ghost
              style={{ width: '100%' }}
              size="middle"
              onClick={() => {
                setPaymentCreditCardData(initialPaymentCreditCardData);
                setAddNewCardAction(true);
              }}
            >
              <b>Add a credit card</b>
            </Button>
          </div>
        )}
      </>
    </Modal>
  );
}

export default TabChargePaymentModal;
