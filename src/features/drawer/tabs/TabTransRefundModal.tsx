import { Button, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import Modal from '../../../ui/Modal';
import {
  PAYMENT_BROKER_DIRECTIONS,
  PAYMENT_CHARGE_TYPES,
  PAYMENT_TYPES,
} from '../../../utils/constants';
import { useOrderPaymentAttachs } from '../../orders/useOrderPaymentAttachs';
import { useOrderPaymentRefund } from '../../orders/useOrderPaymentRefund';

function TabTransRefundModal({
  data,
  orderGuid,
  transactionId,
  isOpenModal,
  onCloseModal,
}) {
  const [attachment, setAttachment] = useState({
    amount: '',
  });
  const { orderPaymentAttachs, isLoadingOrderPaymentAttachs } =
    useOrderPaymentAttachs(data.id, data.status === 'paid');
  const { refundPayment, isLoading, error } = useOrderPaymentRefund();

  const handleRefund = () => {
    if (transactionId) {
      refundPayment({
        transactionId,
        order: orderGuid,
        amount: Number(attachment.amount),
        direction: data?.direction,
      });

      return;
    }

    message.warning('Transaction ID is not provided!');
  };

  useEffect(() => {
    if (data) {
      setAttachment(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && !error) {
      onCloseModal();
    }
  }, [isLoading, error]);

  return (
    <Modal
      title="View a transaction"
      width="small"
      padding="15"
      open={isOpenModal}
      hasEdit
      onCancel={onCloseModal}
    >
      <>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="modal__input-label pl-0">Transaction ID</div>
          </div>
          <div style={{ width: 215, float: 'inline-end', height: 24 }}>
            {transactionId || 'no transaction ID'}
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
            value={attachment.amount}
            onChange={({ target: { value: amount } }) =>
              setAttachment((prev) => ({
                ...prev,
                amount,
              }))
            }
          />
        </div>
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
          className="mb-20"
          loading={isLoading}
          disabled={isLoading}
          onClick={handleRefund}
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
      </>
    </Modal>
  );
}

export default TabTransRefundModal;
