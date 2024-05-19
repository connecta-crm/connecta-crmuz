import { Button, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { CONDITION_TYPES } from '../../../utils/constants';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';

type FeatConditionInnerProps = {
  feature: 'lead' | 'quote' | 'order';
  keyValue: string | string[];
};

function FeatConditionInner({ feature, keyValue }: FeatConditionInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

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
    dispatch(updateField({ field: 'condition', value }));
  };

  return (
    <div className="d-flex justify-end feature-content">
      <div
        className="feature-content__inner"
        style={{ bottom: isEditDetails ? '5px' : '28px' }}
      >
        <Select
          value={leadData.condition}
          defaultValue={leadData.condition}
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
