import { merge } from 'lodash';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  LeadData,
  LeadVehicle,
  getLeadData,
  resetField as resetLeadField,
  setLeadData,
} from './leadSlice';
import { useLeadEdit } from './useLeadEdit';
import { useLeadVehicleEdit } from './useLeadVehicleEdit';

export type UpdateLeadDataProps = {
  keyValue: string | string[];
  feature: 'lead' | 'quote' | 'order';
  field: keyof LeadData; // keyof LeadData | QuoteData
  featureItemData?: LeadVehicle;
  isleadUpdated: boolean;
  setLeadUpdated: (val: boolean) => void;
};

export function useUpdateLeadData({
  keyValue,
  feature,
  field,
  featureItemData,
  isleadUpdated,
  setLeadUpdated,
}: UpdateLeadDataProps) {
  const { onChangeInnerCollapse } = useDrawerFeature();
  const leadData = useAppSelector(getLeadData);
  const dispatch = useAppDispatch();

  const { editLead, updatedLeadData, isLoading, error } = useLeadEdit();

  const { editLeadVehicle, isLoading: isLoadingLeadVehicleEdit } =
    useLeadVehicleEdit();

  const updateLeadModel = {
    ...leadData,
    customer: leadData.customer?.id,
    source: leadData.source?.id,
    origin: leadData.origin?.id,
    destination: leadData.destination?.id,
    user: leadData.user?.id,
    extraUser: leadData?.extraUser,
  };

  const onSaveFeature = () => {
    switch (feature) {
      case 'lead':
        if (field === 'leadVehicles') {
          if (
            featureItemData?.id &&
            featureItemData?.vehicle.id &&
            featureItemData?.vehicleYear
          ) {
            editLeadVehicle({
              id: featureItemData?.id,
              vehicle: featureItemData?.vehicle.id,
              lead: leadData.id,
              vehicleYear: featureItemData?.vehicleYear,
            });
            setLeadUpdated(true);
          }
          return;
        }
        editLead({ guid: leadData.guid, updateLeadModel });
        setLeadUpdated(true);
        break;
      case 'quote':
        // editQuote({ guid: leadData.guid, updateLeadData });
        break;
    }
  };

  const onCancelFeature = () => {
    switch (feature) {
      case 'lead':
        dispatch(resetLeadField({ field }));
        break;
      case 'quote':
        // dispatch(resetQuoteField({ field }));
        break;
    }
    onChangeInnerCollapse(keyValue);
  };

  useEffect(() => {
    if (isleadUpdated && !isLoading && !error) {
      const merged = merge({}, leadData, updatedLeadData);
      dispatch(setLeadData(merged));
      onChangeInnerCollapse(keyValue);
      setLeadUpdated(false);
      console.log('MERGED');
    }
  }, [setLeadUpdated, isleadUpdated, isLoading, error, dispatch]);

  return {
    onCancelFeature,
    onSaveFeature,
    isLoading,
    isLoadingLeadVehicleEdit,
  };
}
