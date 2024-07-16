/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Flex, Spin } from 'antd';
import { useState } from 'react';
import {
  PAYMENT_BROKER_DIRECTIONS,
  PAYMENT_TYPES,
} from '../../../utils/constants';
import { useOrderPayments } from '../../orders/useOrderPayments';
import { useOrderPaymentSendCCA } from '../../orders/useOrderPaymentSendCCA';
import TabAttachModal from './TabAttachModal';
import TabChargePaymentModal from './TabChargePaymentModal';
import TabCreatePaymentModal from './TabCreatePaymentModal';
import TabPaymentModal from './TabPaymentModal';
import TabTransRefundModal from './TabTransRefundModal';

type OrderPayment = {
  id: number;
  executedOn: string;
  name: string;
  quantity: number;
  amount: string;
  amountCharged: string;
  discount: string;
  paymentType: string;
  surchargeFeeRate: number;
  chargeType: string;
  direction: string;
  createdAt: string;
  status: string;
  order: string;
};

function TabPayment({
  orderId,
  orderGuid,
}: {
  orderId: number;
  orderGuid: string;
}) {
  const [isOpenModal, setOpenModal] = useState({
    attachModal: false,
    createPaymentModal: false,
    chargePaymentModal: false,
    paymentModal: false,
    transRefundModal: false,
  });

  const [attachModalData, setAttachModalData] = useState({});
  const { orderPayments, isLoadingOrderPayments } = useOrderPayments(orderGuid);

  const { createOrderPaymentSendCCA, isLoadingSendCCA } =
    useOrderPaymentSendCCA();

  const handlePaymentTypeLabel = (value: string) => {
    return PAYMENT_TYPES.find((type) => type.value === value)?.label;
  };

  const handlePaymentDirectionLabel = (value: string) => {
    return PAYMENT_BROKER_DIRECTIONS.find((type) => type.value === value)
      ?.label;
  };

  if (isLoadingOrderPayments) {
    return (
      <div className="text-center py-10">
        <Spin />
      </div>
    );
  }

  console.log('orderPayments', orderPayments);

  return (
    <>
      <div className="tabs-contract tabs-file">
        {orderPayments.length === 0 ? (
          <div className="tabs-file__content">
            <div className="tabs-file__btns d-flex align-center has-file">
              <Button
                type="primary"
                size="middle"
                onClick={() => {
                  setOpenModal((prev) => ({
                    ...prev,
                    createPaymentModal: true,
                  }));
                }}
              >
                Create a payment
              </Button>
            </div>
          </div>
        ) : (
          <div className="tabs-file__files mt-0">
            <table className="payment-table">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Amount</th>
                  <th>Amount charged</th>
                  <th>Payment type</th>
                  <th>Direction</th>
                  <th style={{ minWidth: 205, padding: 5 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {(orderPayments || []).map((payment: OrderPayment) => (
                  <tr key={payment.id}>
                    <td>{payment.createdAt}</td>
                    <td>${payment.amount}</td>
                    <td className="highlight">${payment.amountCharged}</td>
                    <td>{handlePaymentTypeLabel(payment.paymentType)}</td>
                    <td>{handlePaymentDirectionLabel(payment.direction)}</td>
                    <td style={{ padding: 5 }}>
                      {payment.paymentType === 'credit_card' && (
                        <Button
                          className="ml-10 mb-2"
                          type="primary"
                          size="small"
                          ghost
                          loading={isLoadingSendCCA}
                          disabled={isLoadingSendCCA}
                          onClick={() => {
                            createOrderPaymentSendCCA(payment.id);
                          }}
                        >
                          Send CCA
                        </Button>
                      )}
                      {['car2brok', 'brok2car'].includes(payment.direction) && (
                        <Button
                          className="ml-10 mb-2"
                          type="primary"
                          size="small"
                          ghost
                          onClick={() => {
                            setAttachModalData(payment);
                            setOpenModal((prev) => ({
                              ...prev,
                              transRefundModal: true,
                            }));
                          }}
                        >
                          View
                        </Button>
                      )}
                      {['cus2brok', 'brok2cus'].includes(payment.direction) && (
                        <Button
                          className="ml-10 mb-2"
                          type="primary"
                          size="small"
                          ghost
                          // style={{ backgroundColor: 'rgb(66, 125, 157)' }}
                          onClick={() => {
                            setAttachModalData(payment);
                            setOpenModal((prev) => ({
                              ...prev,
                              transRefundModal: true,
                            }));
                          }}
                        >
                          Receipt
                        </Button>
                      )}
                      {payment.status === 'created' &&
                        payment.paymentType !== 'credit_card' && (
                          <Button
                            className="ml-10 mb-2"
                            type="primary"
                            size="small"
                            onClick={() => {
                              setAttachModalData(payment);
                              setOpenModal((prev) => ({
                                ...prev,
                                attachModal: true,
                              }));
                            }}
                          >
                            Attach
                          </Button>
                        )}
                      {payment.status === 'paid' && (
                        <Button
                          className="ml-10 mb-2"
                          type="primary"
                          size="small"
                          style={{ backgroundColor: 'rgb(66, 125, 157)' }}
                          onClick={() => {
                            setAttachModalData(payment);
                            setOpenModal((prev) => ({
                              ...prev,
                              attachModal: true,
                            }));
                          }}
                        >
                          Paid
                        </Button>
                      )}
                      {payment.status === 'created' &&
                        payment.paymentType === 'credit_card' && (
                          <Button
                            className="ml-10 mb-2"
                            type="primary"
                            size="small"
                            onClick={() => {
                              setAttachModalData(payment);
                              setOpenModal((prev) => ({
                                ...prev,
                                chargePaymentModal: true,
                              }));
                            }}
                          >
                            Charge
                          </Button>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {orderPayments.length !== 0 && (
        <Flex
          style={{
            justifyContent: 'space-between',
            padding: '0px 10px 8px',
          }}
          gap="small"
          wrap="wrap"
        >
          <span></span>
          <div>
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, createPaymentModal: true }));
              }}
            >
              Create a payment
            </Button>
          </div>
        </Flex>
      )}
      <TabAttachModal
        data={attachModalData}
        orderId={orderId}
        isOpenModal={isOpenModal.attachModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, attachModal: false }))
        }
      />
      {/* <TabPaymentAttachModal
        data={attachModalData}
        isOpenModal={isOpenModal.attachModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, attachModal: false }))
        }
      /> */}
      <TabCreatePaymentModal
        orderGuid={orderGuid}
        isOpenModal={isOpenModal.createPaymentModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, createPaymentModal: false }))
        }
      />
      <TabChargePaymentModal
        data={attachModalData}
        orderGuid={orderGuid}
        isOpenModal={isOpenModal.chargePaymentModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, chargePaymentModal: false }))
        }
      />
      <TabPaymentModal
        isOpenModal={isOpenModal.paymentModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, paymentModal: false }))
        }
      />
      <TabTransRefundModal
        isOpenModal={isOpenModal.transRefundModal}
        onCloseModal={() =>
          setOpenModal((prev) => ({ ...prev, transRefundModal: false }))
        }
      />
    </>
  );
}

export default TabPayment;
//   <Button
//   className="ml-10"
//   ghost
//   type="primary"
//   size="small"
//   onClick={() =>
//     setOpenModal((prev) => ({
//       ...prev,
//       transRefundModal: true,
//     }))
//   }
// >
//   Receipt
// </Button>
// <Button
//   className="ml-10"
//   type="primary"
//   size="small"
//   style={{ backgroundColor: 'rgb(66, 125, 157)' }}
// >
//   Paid
// </Button>

//   <Button
//   className="ml-10"
//   ghost
//   type="primary"
//   size="small"
//   onClick={() =>
//     setOpenModal((prev) => ({
//       ...prev,
//       paymentModal: true,
//     }))
//   }
// >
//   Send CCA
// </Button>
// <Button
//   className="ml-10"
//   type="primary"
//   size="small"
//   onClick={() =>
//     setOpenModal((prev) => ({
//       ...prev,
//       chargePaymentModal: true,
//     }))
//   }
// >
//   Charge
// </Button>

//   <Button className="ml-10" ghost type="primary" size="small">
//   Receipt CCA
// </Button>
// <Button className="ml-10" type="primary" size="small">
//   Charge
// </Button>
