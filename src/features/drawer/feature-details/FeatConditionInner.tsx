import { LoadingOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { SourceType } from '../../../ui/Drawer';
import { CONDITION_TYPES } from '../../../utils/constants';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../../leads/leadSlice';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';

export type FeatItemInnerProps = {
  feature: SourceType;
  keyValue: string | string[];
};

function FeatConditionInner({ feature, keyValue }: FeatItemInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

  let featureData;

  switch (feature) {
    case 'lead':
      featureData = leadData;
      break;
    case 'quote':
      featureData = quoteData;
      break;
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
    field: 'condition',
    isDataUpdated,
    setDataUpdated,
  });

  const handleChange = (value: string) => {
    switch (feature) {
      case 'lead':
        dispatch(updateLeadField({ field: 'condition', value }));
        break;
      case 'quote':
        dispatch(updateQuoteField({ field: 'condition', value }));
        break;
      case 'order':
        dispatch(updateOrderField({ field: 'condition', value }));
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
          value={featureData.condition}
          defaultValue={featureData.condition}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
          options={CONDITION_TYPES}
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
            onClick={onSaveFeature}
          >
            {isLoading ? <LoadingOutlined /> : 'Save'}
          </Button>
        </>
      )}
    </div>
  );
}

export default FeatConditionInner;
