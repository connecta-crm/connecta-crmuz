/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import Modal from '../../ui/Modal';
import { useUpdateFeatureData } from '../leads/useUpdateFeatureData';
import OrderDispatchModalContent from './OrderDispatchModalContent';
import { getOrderData } from './orderSlice';
import { useOrderDispatchEdit } from './useOrderDispatchEdit';

type OrderDispatchModalProps = {
  isLoadingOrder: boolean;
  openCarrierModal: boolean;
  setOpenCarrierModal: (val: boolean) => void;
};

function OrderDispatchModal({
  openCarrierModal,
  setOpenCarrierModal,
}: OrderDispatchModalProps) {
  const [isDataUpdated, setDataUpdated] = useState(false);
  const [isDispatchUpdated, setDispatchUpdated] = useState(false);

  const orderData = useAppSelector(getOrderData);

  const { editOrderDispatch, updatedOrderDispatchData, isLoadingDispatch } =
    useOrderDispatchEdit();

  const { onCancelFeature, onSaveFeature, isLoading, updatedOrderData } =
    useUpdateFeatureData({
      keyValue: '000',
      feature: 'order',
      field: 'payments',
      isDataUpdated,
      setDataUpdated,
    });

  const handleSaveDispatch = () => {
    const {
      carrierData,
      dispatchCodMethod,
      dispatchPaidBy,
      dispatchPaymentTerm,
      dispatchPaymentType,
      dispatchTermBegins,
    } = orderData.dispatchData;

    const dispatchModel = {
      dispatchPaidBy,
      dispatchPaymentTerm,
      dispatchTermBegins,
      dispatchCodMethod,
      dispatchPaymentType,
      carrierData,
    };

    editOrderDispatch({
      guid: orderData.guid,
      updateOrderDispatchModel: dispatchModel,
    });
    setDispatchUpdated(true);
  };

  useEffect(() => {
    if (!isLoading && updatedOrderData) {
      setOpenCarrierModal(false);
    }
  }, [isLoading, updatedOrderData]);

  useEffect(() => {
    if (isDispatchUpdated && !isLoadingDispatch && updatedOrderDispatchData) {
      setOpenCarrierModal(false);
      setDispatchUpdated(false);
    }
  }, [isDispatchUpdated, isLoadingDispatch, updatedOrderDispatchData]);

  return (
    <Modal
      title="Dispatching to a carrier"
      width="middle"
      padding="0"
      loading={isLoading}
      open={openCarrierModal}
      onCancel={() => {
        setOpenCarrierModal(false);
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
          {!isLoadingDispatch ? (
            'Dispatch'
          ) : (
            <>
              Dispatch <LoadingOutlined />
            </>
          )}
        </Button>
      }
    >
      <OrderDispatchModalContent />
    </Modal>
  );
}

export default OrderDispatchModal;
