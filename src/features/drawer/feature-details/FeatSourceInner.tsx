import { Button, Select, Spin } from 'antd';
import { ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';
import { useProviders } from '../../providers/useProviders';

import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { setLeadData } from '../../leads/leadSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { merge } from 'lodash';
import { useEffect } from 'react';
import { resetField as resetLeadField } from '../../leads/leadSlice';
import { useLeadEdit } from '../../leads/useLeadEdit';

type FeatSourceInnerProps = {
  feature: string;
  keyValue: string | string[];
};

function FeatSourceInner({ feature, keyValue }: FeatSourceInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [select, setSelect] = useState(false);

  const { providers, isFetching: isLoading } = useProviders(select);

  const handleChange = (_: number | string, option: ReactNode) => {
    if (!Array.isArray(option)) {
      dispatch(updateField({ field: 'source', value: option?.data }));
    }
  };

  const { onChangeInnerCollapse } = useDrawerFeature();

  const {
    editLead,
    updatedLeadData,
    error: errorEditLead,
    isLoading: isLoadingEditLead,
  } = useLeadEdit();

  const updateLeadModel = {
    ...leadData,
    customer: leadData.customer?.id,
    source: leadData.source?.id,
    origin: leadData.origin?.id,
    destination: leadData.destination?.id,
    user: leadData.user?.id,
    extraUser: leadData?.extraUser,
  };

  const handleSave = () => {
    switch (feature) {
      case 'lead':
        editLead({ guid: leadData.guid, updateLeadModel });
        break;
      case 'quote':
        // editQuote({ guid: leadData.guid, updateLeadData });
        break;
    }
  };

  const handleCancel = () => {
    switch (feature) {
      case 'lead':
        dispatch(resetLeadField({ field: 'source' }));
        break;
      case 'quote':
        // dispatch(resetQuoteField({ field }));
        break;
    }
    onChangeInnerCollapse(keyValue);
  };

  useEffect(() => {
    if (!isLoadingEditLead && !errorEditLead) {
      const merged = merge({}, leadData, updatedLeadData);
      dispatch(setLeadData(merged));
      onChangeInnerCollapse(keyValue);
    }
  }, [isLoadingEditLead, keyValue, errorEditLead]);

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
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : 'No such source'}
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
          disabled={isLoadingEditLead}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="ml-10"
          type="primary"
          size="small"
          disabled={isLoadingEditLead}
          onClick={handleSave}
        >
          {isLoadingEditLead ? <LoadingOutlined /> : 'Save'}
        </Button>
      </>
    </div>
  );
}

export default FeatSourceInner;
