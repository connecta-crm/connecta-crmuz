/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Modal from '../../ui/Modal';
import { useUpdateFeatureData } from '../leads/useUpdateFeatureData';
import OrderDirectDispatchModalContent from './OrderDirectDispatchModalContent';
import { OrderModalProps } from './OrderDispatchModal';
import { getOrderData } from './orderSlice';
import { useOrderDirectDispatchEdit } from './useOrderDirectDispatchEdit';

function OrderDirectDispatchModal({
  isOpenModal,
  onOpenModal,
}: OrderModalProps) {
  const [isDataUpdated, setDataUpdated] = useState(false);
  const [isDispatchUpdated, setDispatchUpdated] = useState(false);

  const orderData = useAppSelector(getOrderData);

  const {
    editOrderDirectDispatch,
    updatedOrderDirectDispatchData,
    isLoadingDirectDispatch,
  } = useOrderDirectDispatchEdit();

  const { onCancelFeature, onSaveFeature, isLoading, updatedOrderData } =
    useUpdateFeatureData({
      keyValue: '000',
      feature: 'order',
      field: 'payments',
      isDataUpdated,
      setDataUpdated,
    });

  const handleSaveDispatch = () => {
    const { dateEstPu, dateEstDel, dateEstShip } = orderData;
    const {
      carrierData,
      dispatchCodMethod,
      dispatchPaidBy,
      dispatchPaymentTerm,
      dispatchPaymentType,
      dispatchTermBegins,
    } = orderData.dispatchData;

    const directDispatchModel = {
      dispatchPaidBy,
      dispatchPaymentTerm,
      dispatchTermBegins,
      dispatchCodMethod,
      dispatchPaymentType,
      carrierData,
      isDispatch: true,
      dateEstPu,
      dateEstDel,
      dateEstShip,
    };

    editOrderDirectDispatch({
      guid: orderData.guid,
      updateOrderDirectDispatchModel: directDispatchModel,
    });
    setDispatchUpdated(true);
  };

  useEffect(() => {
    if (!isLoading && updatedOrderData) {
      onOpenModal(false);
    }
  }, [isLoading, updatedOrderData]);

  useEffect(() => {
    if (
      isDispatchUpdated &&
      !isLoadingDirectDispatch &&
      updatedOrderDirectDispatchData
    ) {
      onOpenModal(false);
      setDispatchUpdated(false);
    }
  }, [
    isDispatchUpdated,
    isLoadingDirectDispatch,
    updatedOrderDirectDispatchData,
  ]);

  return (
    <Modal
      title="Direct dispatch to a carrier"
      width="middle"
      padding="0"
      loading={isLoading}
      open={isOpenModal}
      onCancel={() => {
        onOpenModal(false);
        onCancelFeature();
      }}
      onSave={onSaveFeature}
      extraBtnToHeader={
        <Button
          size="small"
          type="primary"
          className="ml-10"
          style={{ backgroundColor: '#427d9d' }}
          disabled={false}
          onClick={handleSaveDispatch}
        >
          {!isLoadingDirectDispatch ? (
            'Dispatch'
          ) : (
            <>
              Dispatch <LoadingOutlined />
            </>
          )}
        </Button>
      }
    >
      <OrderDirectDispatchModalContent />
    </Modal>
  );
}

export default OrderDirectDispatchModal;
