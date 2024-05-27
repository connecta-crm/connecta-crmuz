import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import { FeatItemInnerProps } from '../feature-details/FeatConditionInner';

function FeatPayReservationInner({ feature, keyValue }: FeatItemInnerProps) {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector(getOrderData);

  let featureData;

  switch (feature) {
    case 'order':
      featureData = orderData;
      break;
    default:
      break;
  }

  const [isDataUpdated, setDataUpdated] = useState(false);
  const { isEditPayment } = useDrawerFeature();

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateFeatureData({
    keyValue,
    feature,
    field: 'paymentReservation',
    isDataUpdated,
    setDataUpdated,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (feature) {
      case 'order':
        dispatch(updateOrderField({ field: 'paymentReservation', value }));
        break;
      default:
        break;
    }
  };

  if (!featureData) {
    return;
  }

  return (
    <div className="d-flex justify-end feature-content">
      <div
        className="feature-content__inner"
        style={{ bottom: isEditPayment ? '5px' : '28px' }}
      >
        <Input
          value={featureData.paymentReservation}
          defaultValue={featureData.paymentReservation}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
        />
      </div>
      {!isEditPayment && (
        <>
          <Button
            block
            size="small"
            style={{ width: 'auto' }}
            disabled={isLoading}
            onClick={onCancelFeature}
          >
            Cancel
          </Button>
          <Button
            className="ml-10"
            type="primary"
            size="small"
            disabled={isLoading}
            onClick={onSaveFeature}
          >
            {isLoading ? <LoadingOutlined /> : 'Save'}
          </Button>
        </>
      )}
    </div>
  );
}

export default FeatPayReservationInner;
