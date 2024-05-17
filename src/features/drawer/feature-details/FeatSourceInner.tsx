import { Button, Select, Spin } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';
import { useProviders } from '../../providers/useProviders';

import { LoadingOutlined } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/es/select';
import { useUpdateLeadData } from '../../leads/useUpdateLeadData';

type FeatSourceInnerProps = {
  feature: 'lead' | 'order' | 'quote';
  keyValue: string | string[];
};

function FeatSourceInner({ feature, keyValue }: FeatSourceInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [select, setSelect] = useState(false);
  const [isleadUpdated, setLeadUpdated] = useState(false);

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateLeadData({
    keyValue,
    feature,
    field: 'source',
    isleadUpdated,
    setLeadUpdated,
  });

  const { providers, isFetching: isLoadingProviders } = useProviders(select);

  const handleChange = (_: number | string, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      dispatch(updateField({ field: 'source', value: option?.data }));
    }
  };

  return (
    <div className="d-flex justify-end feature-content">
      <div className="feature-content__inner">
        <Select
          size="small"
          filterOption={false}
          placeholder="Search city"
          defaultValue={leadData.source.name}
          value={leadData.source.name}
          onChange={handleChange}
          onFocus={() => setSelect(true)}
          style={{ width: 218 }}
          loading={isLoadingProviders}
          notFoundContent={
            isLoadingProviders ? <Spin size="small" /> : 'No such source'
          }
          options={(providers || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        />
      </div>
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
    </div>
  );
}

export default FeatSourceInner;
