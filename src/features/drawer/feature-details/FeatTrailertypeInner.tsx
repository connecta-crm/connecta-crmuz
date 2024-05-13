import { Button, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { setLeadData } from '../../leads/leadSlice';

import { LoadingOutlined } from '@ant-design/icons';
import { merge } from 'lodash';
import { useEffect } from 'react';
import { TRAILER_TYPES } from '../../../utils/constants';
import { resetField as resetLeadField } from '../../leads/leadSlice';
import { useLeadEdit } from '../../leads/useLeadEdit';

type FeatTrailertypeInnerProps = {
  feature: string;
  keyValue: string | string[];
};

function FeatTrailertypeInner({
  feature,
  keyValue,
}: FeatTrailertypeInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (value: string) => {
    dispatch(updateField({ field: 'trailerType', value }));
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
        dispatch(resetLeadField({ field: 'trailerType' }));
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
          value={leadData.trailerType}
          defaultValue={leadData.trailerType}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChange}
          options={TRAILER_TYPES}
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

export default FeatTrailertypeInner;
