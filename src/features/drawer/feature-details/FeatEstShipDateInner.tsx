import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useUpdateLeadData } from '../../leads/useUpdateFeatureData';

type FeatEstShipDateInnerProps = {
  feature: 'lead' | 'quote' | 'order';
  keyValue: string | string[];
};

function FeatEstShipDateInner({
  feature,
  keyValue,
}: FeatEstShipDateInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [isleadUpdated, setLeadUpdated] = useState(false);
  const { isEditDetails } = useDrawerFeature();

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateLeadData({
    keyValue,
    feature,
    field: 'dateEstShip',
    isleadUpdated,
    setLeadUpdated,
  });

  const handleChange = (_: string, value: string | string[]) => {
    if (!Array.isArray(value)) {
      dispatch(updateField({ field: 'dateEstShip', value }));
    }
  };

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
          value={dayjs(leadData.dateEstShip, 'MM-DD-YYYY') as unknown as string}
          defaultValue={
            dayjs(leadData.dateEstShip, 'MM-DD-YYYY') as unknown as string
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
