import { Button, Select } from 'antd';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, setLeadData, updateField } from '../../leads/leadSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { merge } from 'lodash';
import { useEffect } from 'react';
import { resetField as resetLeadField } from '../../leads/leadSlice';
import { useLeadEdit } from '../../leads/useLeadEdit';
import { CONDITION_TYPES } from '../../../utils/constants';

type FeatConditionInnerProps = {
  feature: string;
  keyValue: string | string[];
};

function FeatConditionInner({ feature, keyValue }: FeatConditionInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

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

  const handleChange = (value: string) => {
    dispatch(updateField({ field: 'condition', value }));
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
        dispatch(resetLeadField({ field: 'condition' }));
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
          value={leadData.condition}
          defaultValue={leadData.condition}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
          options={CONDITION_TYPES}
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

export default FeatConditionInner;
