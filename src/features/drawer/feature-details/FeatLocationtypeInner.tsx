import { Button, Select } from 'antd';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { LOCATION_TYPES } from '../../../utils/constants';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';

import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import { FeatItemInnerProps } from './FeatConditionInner';

function FeatLocationtypeInner({ feature, keyValue }: FeatItemInnerProps) {
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
  const { isEditDetails } = useDrawerFeature();

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateFeatureData({
    keyValue,
    feature,
    field: 'locationType',
    isDataUpdated,
    setDataUpdated,
  });

  const handleChange = (value: string) => {
    switch (feature) {
      case 'order':
        dispatch(updateOrderField({ field: 'locationType', value }));
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
        style={{ bottom: isEditDetails ? '5px' : '28px' }}
      >
        <Select
          value={featureData.locationType}
          defaultValue={featureData.locationType}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
          options={LOCATION_TYPES}
        />
      </div>
      {!isEditDetails && (
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
            loading={isLoading}
            onClick={onSaveFeature}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
}

export default FeatLocationtypeInner;
