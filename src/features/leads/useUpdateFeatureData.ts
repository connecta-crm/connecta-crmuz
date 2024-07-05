/* eslint-disable @typescript-eslint/no-unused-vars */
import { merge } from 'lodash';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import {
  LeadData,
  LeadVehicle,
  OrderData,
  OrderVehicle,
  QuoteData,
  QuoteVehicle,
} from '../../models';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SourceType } from '../../ui/Drawer';
import { getUser } from '../authentication/authSlice';
import {
  getOrderData,
  resetField as resetOrderField,
  setOrderData,
} from '../orders/orderSlice';
import { useOrderEdit } from '../orders/useOrderEdit';
import { useOrderVehicleEdit } from '../orders/useOrderVehicleEdit';
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
import { isOrderData } from './useCheckTypeData';
import { useLeadEdit } from './useLeadEdit';
import { useLeadVehicleEdit } from './useLeadVehicleEdit';

export type UpdateLeadDataProps = {
  keyValue: string | string[];
  feature: SourceType;
  field: keyof LeadData | keyof QuoteData | keyof OrderData;
  featureItemData?: LeadVehicle | QuoteVehicle | OrderVehicle;
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
  const { onChangeInnerCollapse, onChangeMainCollapse, onEditPayment } =
    useDrawerFeature();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

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
  const {
    editOrder,
    updatedOrderData,
    isLoading: isLoadingOrder,
    error: orderError,
  } = useOrderEdit();
  const {
    editOrderVehicle,
    updatedOrderVehicleData,
    isLoading: isLoadingOrderVehicleEdit,
  } = useOrderVehicleEdit();

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
    case 'order':
      data = orderData;
      error = orderError;
      isLoading = isLoadingOrder;
      updatedVehicleData = updatedOrderVehicleData;
      isLoadingVehicleEdit = isLoadingOrderVehicleEdit;
      break;
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
    extraUser: null,
    ...(data && isOrderData(data)
      ? {
          dateEstShip: data.dates?.dateEstShip,
          dateEstPu: data.dates?.dateEstPu,
          dateEstDel: data.dates?.dateEstDel,
          dateDispatched: data.dates?.dateDispatched,
          datePickedUp: data.dates?.datePickedUp,
          dateDelivered: data.dates?.dateDelivered,

          paymentTotalTariff: data.payments?.paymentTotalTariff,
          paymentReservation: data.payments?.paymentReservation,
          paymentPaidReservation: data.payments?.paymentPaidReservation,
          paymentCarrierPay: data.payments?.paymentCarrierPay,
          paymentCodToCarrier: data.payments?.paymentCodToCarrier,
          paymentPaidToCarrier: data.payments?.paymentPaidToCarrier,

          dispatchPaidBy: data.dispatchData?.dispatchPaidBy,
          dispatchPaymentTerm: data.dispatchData?.dispatchPaymentTerm,
          dispatchTermBegins: data.dispatchData?.dispatchTermBegins,
          dispatchCodMethod: data.dispatchData?.dispatchCodMethod,
          dispatchPaymentType: data.dispatchData?.dispatchPaymentType,

          carrier: data.dispatchData?.carrierData?.id,
        }
      : {}),
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
        } else {
          editQuote({ guid: data?.guid || '', updateQuoteModel: updateModel });
        }
        setDataUpdated(true);
        break;
      case 'order':
        if (
          field === 'orderVehicles' &&
          featureItemData?.id &&
          featureItemData?.vehicle.id &&
          featureItemData?.vehicleYear
        ) {
          editOrderVehicle({
            id: featureItemData?.id,
            vehicle: featureItemData?.vehicle.id,
            order: data?.id || 0,
            vehicleYear: featureItemData?.vehicleYear,
            color: featureItemData?.color,
            vin: featureItemData?.vin,
            plate: featureItemData?.plate,
            lot: featureItemData?.lot,
          });
        } else {
          editOrder({ guid: data?.guid || '', updateOrderModel: updateModel });
        }
        setDataUpdated(true);
        break;
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
        dispatch(resetQuoteField({ field }));
        break;
      case 'order':
        dispatch(resetOrderField({ field }));
        break;
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
      (updatedVehicleData ||
        updatedLeadData ||
        updatedQuoteData ||
        updatedOrderData)
    ) {
      let updatedData, merged;

      switch (feature) {
        case 'lead':
          updatedData = updatedLeadData;
          merged = merge({}, data, updatedData);
          dispatch(setLeadData(merged));
          break;
        case 'quote':
          updatedData = updatedQuoteData;
          merged = merge({}, data, updatedData);
          dispatch(setQuoteData(merged));
          break;
        case 'order':
          updatedData = updatedOrderData;
          merged = merge({}, data, updatedData);
          dispatch(setOrderData(merged));
          break;
        default:
          throw new Error('Invalid feature type');
      }

      onChangeInnerCollapse(keyValue);
      setDataUpdated(false);
      console.log('MERGED', keyValue);
      if (keyValue === '400') {
        onChangeInnerCollapse([]);
        onEditPayment(false);
      }
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
    updatedOrderData,
  ]);

  return {
    onCancelFeature,
    onSaveFeature,
    isLoading,
    isLoadingVehicleEdit,
    error,
    updatedLeadData,
    updatedQuoteData,
    updatedOrderData,
  };
}
