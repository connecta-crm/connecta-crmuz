import { Button, Select, Spin } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useProviders } from '../../providers/useProviders';

import { LoadingOutlined } from '@ant-design/icons';
import { DefaultOptionType } from 'antd/es/select';
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

type FeatSourceInnerProps = {
  feature: 'lead' | 'order' | 'quote';
  keyValue: string | string[];
};

function FeatSourceInner({ feature, keyValue }: FeatSourceInnerProps) {
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

  const [select, setSelect] = useState(false);
  const [isDataUpdated, setDataUpdated] = useState(false);
  const { isEditDetails } = useDrawerFeature();

  const { onCancelFeature, onSaveFeature, isLoading } = useUpdateFeatureData({
    keyValue,
    feature,
    field: 'source',
    isDataUpdated,
    setDataUpdated,
  });

  const { providers, isFetching: isLoadingProviders } = useProviders(select);

  const handleChange = (_: number | string, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      switch (feature) {
        case 'lead':
          dispatch(updateLeadField({ field: 'source', value: option?.data }));
          break;
        case 'quote':
          dispatch(updateQuoteField({ field: 'source', value: option?.data }));
          break;
        default:
          break;
      }
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

export default FeatSourceInner;
