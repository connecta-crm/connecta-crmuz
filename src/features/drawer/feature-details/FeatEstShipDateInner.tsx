import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../../leads/leadSlice';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';
import { FeatItemInnerProps } from './FeatConditionInner';

function FeatEstShipDateInner({ feature, keyValue }: FeatItemInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);

  let featureData;

  switch (feature) {
    case 'lead':
      featureData = leadData;
      break;
    case 'quote':
      featureData = quoteData;
      break;
    default:
      break;
  }

  const [isDataUpdated, setDataUpdated] = useState(false);
  const { isEditDetails } = useDrawerFeature();

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateFeatureData({
    keyValue,
    feature,
    field: 'dateEstShip',
    isDataUpdated,
    setDataUpdated,
  });

  const handleChange = (value: string) => {
    console.log(value, 'dsdd');
    switch (feature) {
      case 'lead':
        dispatch(updateLeadField({ field: 'dateEstShip', value }));
        break;
      case 'quote':
        dispatch(updateQuoteField({ field: 'dateEstShip', value }));
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
        <DatePicker
          format={{
            format: 'MM-DD-YYYY',
            type: 'mask',
          }}
          allowClear={false}
          type="date"
          name="est_ship_date"
          value={
            dayjs(featureData.dateEstShip, 'MM-DD-YYYY') as unknown as string
          }
          defaultValue={
            dayjs(featureData.dateEstShip, 'MM-DD-YYYY') as unknown as string
          }
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
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

export default FeatEstShipDateInner;
