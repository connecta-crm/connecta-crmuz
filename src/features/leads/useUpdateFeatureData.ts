/* eslint-disable @typescript-eslint/no-unused-vars */
import { merge } from 'lodash';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { LeadData, LeadVehicle, QuoteData, QuoteVehicle } from '../../models';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SourceType } from '../../ui/Drawer';
import { getUser } from '../authentication/authSlice';
import {
  getQuoteData,
  resetField as resetQuoteField,
  setQuoteData,
} from '../quotes/quoteSlice';
import { useQuoteEdit } from '../quotes/useQuoteEdit';
import { useQuoteVehicleEdit } from '../quotes/useQuoteVehicleEdit';
import {
  getLeadData,
  resetField as resetLeadField,
  setLeadData,
} from './leadSlice';
import { useLeadEdit } from './useLeadEdit';
import { useLeadVehicleEdit } from './useLeadVehicleEdit';

export type UpdateLeadDataProps = {
  keyValue: string | string[];
  feature: SourceType;
  field: keyof LeadData | keyof QuoteData;
  featureItemData?: LeadVehicle | QuoteVehicle;
  isDataUpdated: boolean;
  setDataUpdated: (val: boolean) => void;
};

export function useUpdateFeatureData({
  keyValue,
  feature,
  field,
  featureItemData,
  isDataUpdated,
  setDataUpdated,
}: UpdateLeadDataProps) {
  const { onChangeInnerCollapse } = useDrawerFeature();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getQuoteData);

  // * LEAD
  const {
    editLead,
    updatedLeadData,
    isLoading: isLoadingLead,
    error: leadError,
  } = useLeadEdit();

  const {
    editLeadVehicle,
    updatedLeadVehicleData,
    isLoading: isLoadingLeadVehicleEdit,
  } = useLeadVehicleEdit();

  // * QUOTE
  const {
    editQuote,
    updatedQuoteData,
    isLoading: isLoadingQuote,
    error: quoteError,
  } = useQuoteEdit();

  const {
    editQuoteVehicle,
    updatedQuoteVehicleData,
    isLoading: isLoadingQuoteVehicleEdit,
  } = useQuoteVehicleEdit();

  // * ORDER
  // const { editOrder, updatedOrderData, isLoading: isLoadingOrder, error: orderError } = useOrderEdit();
  // const { editOrderVehicle, isLoading: isLoadingOrderVehicleEdit } = useOrderVehicleEdit();

  let data, isLoading, error, isLoadingVehicleEdit, updatedVehicleData: unknown;

  switch (feature) {
    case 'lead':
      data = leadData;
      error = leadError;
      isLoading = isLoadingLead;
      updatedVehicleData = updatedLeadVehicleData;
      isLoadingVehicleEdit = isLoadingLeadVehicleEdit;
      break;
    case 'quote':
      data = quoteData;
      error = quoteError;
      isLoading = isLoadingQuote;
      updatedVehicleData = updatedQuoteVehicleData;
      isLoadingVehicleEdit = isLoadingQuoteVehicleEdit;
      break;
    // case 'order':
    //   data = orderData;
    //   isLoading = isLoadingOrder;
    //   error = orderError;
    //   isLoadingVehicleEdit = isLoadingOrderVehicleEdit;
    //   break;
    default:
      data = null;
      isLoading = false;
      error = null;
      isLoadingVehicleEdit = false;
      updatedVehicleData = null;
      break;
  }

  const updateModel = {
    ...data,
    customer: data?.customer?.id,
    source: data?.source?.id,
    origin: data?.origin?.id,
    destination: data?.destination?.id,
    user: data?.user?.id || user?.id,
    extraUser: data?.extraUser,
  };

  const onSaveFeature = () => {
    switch (feature) {
      case 'lead':
        if (
          field === 'leadVehicles' &&
          featureItemData?.id &&
          featureItemData?.vehicle.id &&
          featureItemData?.vehicleYear
        ) {
          editLeadVehicle({
            id: featureItemData?.id,
            vehicle: featureItemData?.vehicle.id,
            lead: data?.id || 0,
            vehicleYear: featureItemData?.vehicleYear,
          });
        } else {
          editLead({ guid: data?.guid || '', updateLeadModel: updateModel });
        }
        setDataUpdated(true);
        break;
      case 'quote':
        if (
          field === 'quoteVehicles' &&
          featureItemData?.id &&
          featureItemData?.vehicle.id &&
          featureItemData?.vehicleYear
        ) {
          editQuoteVehicle({
            id: featureItemData?.id,
            vehicle: featureItemData?.vehicle.id,
            quote: data?.id || 0,
            vehicleYear: featureItemData?.vehicleYear,
          });
          setDataUpdated(true);
          return;
        }
        editQuote({ guid: data?.guid || '', updateQuoteModel: updateModel });
        setDataUpdated(true);
        break;
      // case 'order':
      //   if (
      //     field === 'orderVehicles' &&
      //     featureItemData?.id &&
      //     featureItemData?.vehicle.id &&
      //     featureItemData?.vehicleYear
      //   ) {
      //     editOrderVehicle({
      //       id: featureItemData?.id,
      //       vehicle: featureItemData?.vehicle.id,
      //       order: data.id,
      //       vehicleYear: featureItemData?.vehicleYear,
      //     });
      //     setDataUpdated(true);
      //     return;
      //   }
      //   editOrder({ guid: data.guid, updateModel });
      //   setDataUpdated(true);
      //   break;
      default:
        throw new Error('Invalid feature type');
    }
  };

  const onCancelFeature = () => {
    switch (feature) {
      case 'lead':
        dispatch(resetLeadField({ field }));
        break;
      case 'quote':
        console.log('field', field);
        dispatch(resetQuoteField({ field }));
        break;
      // case 'order':
      //   dispatch(resetOrderField({ field }));
      //   break;
      default:
        throw new Error('Invalid feature type');
    }
    onChangeInnerCollapse(keyValue);
  };

  useEffect(() => {
    if (
      isDataUpdated &&
      !isLoading &&
      !isLoadingVehicleEdit &&
      !error &&
      (updatedVehicleData || updatedLeadData || updatedQuoteData)
    ) {
      let updatedData, merged;

      switch (feature) {
        case 'lead':
          updatedData = updatedVehicleData || updatedLeadData;
          merged = merge({}, data, updatedData);
          dispatch(setLeadData(merged));
          break;
        case 'quote':
          updatedData = updatedVehicleData || updatedQuoteData;
          merged = merge({}, data, updatedData);
          dispatch(setQuoteData(merged));
          break;
        default:
          throw new Error('Invalid feature type');
      }

      onChangeInnerCollapse(keyValue);
      setDataUpdated(false);
      console.log('MERGED', keyValue);
    }
  }, [
    setDataUpdated,
    isDataUpdated,
    isLoading,
    isLoadingVehicleEdit,
    error,
    dispatch,
    updatedVehicleData,
    updatedLeadData,
    updatedQuoteData,
  ]);

  return {
    onCancelFeature,
    onSaveFeature,
    isLoading,
    isLoadingVehicleEdit,
  };
}
