import { Button, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { TRAILER_TYPES } from '../../../utils/constants';
import { useUpdateLeadData } from '../../leads/useUpdateLeadData';

type FeatTrailertypeInnerProps = {
  feature: 'lead' | 'quote' | 'order';
  keyValue: string | string[];
};

function FeatTrailertypeInner({
  feature,
  keyValue,
}: FeatTrailertypeInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [isleadUpdated, setLeadUpdated] = useState(false);
  const { isEditDetails } = useDrawerFeature();

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateLeadData({
    keyValue,
    feature,
    field: 'trailerType',
    isleadUpdated,
    setLeadUpdated,
  });

  const handleChange = (value: string) => {
    dispatch(updateField({ field: 'trailerType', value }));
  };

  return (
    <div className="d-flex justify-end feature-content">
      <div
        className="feature-content__inner"
        style={{ bottom: isEditDetails ? '5px' : '28px' }}
      >
        <Select
          value={leadData.trailerType}
          defaultValue={leadData.trailerType}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
          options={TRAILER_TYPES}
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

export default FeatTrailertypeInner;
