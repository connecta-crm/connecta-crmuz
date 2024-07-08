import { Button, Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
  getLeadData,
  resetField as resetLeadField,
  updateField as updateLeadField,
} from '../../leads/leadSlice';
import { useLeadConvert } from '../../leads/useLeadConvert';
import { useUpdateFeatureData } from '../../leads/useUpdateFeatureData';
import {
  getOrderData,
  resetField as resetOrderField,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import {
  getQuoteData,
  resetField as resetQuoteField,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';
import { FeatItemInnerProps } from './FeatConditionInner';
import FeatItemLabel from './FeatItemLabel';

function FeatTotalTariffInner({ keyValue, feature }: FeatItemInnerProps) {
  const [loadingType, setLoadingType] = useState('save');
  const [isDataUpdated, setDataUpdated] = useState(false);
  const dispatch = useAppDispatch();
  const { onChangeInnerCollapse, closeDrawer } = useDrawerFeature();
  const {
    leadConvert,
    isLoading: isLoadingLeadConvert,
    error,
    isSuccess,
  } = useLeadConvert();

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

  const { onSaveFeature, isLoading } = useUpdateFeatureData({
    keyValue,
    feature,
    field: 'price', // * does not matter as it needs for when onCancelFeature calls!
    isDataUpdated,
    setDataUpdated,
  });

  let featureData;

  switch (feature) {
    case 'lead':
      featureData = leadData;
      break;
    case 'quote':
      featureData = quoteData;
      break;
    case 'order':
      featureData = orderData;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (!isLoadingLeadConvert && !error && isSuccess) {
      closeDrawer();
    }
  }, [isLoadingLeadConvert, error, isSuccess]);

  if (!featureData) {
    return;
  }

  const { guid, price, reservationPrice } = featureData;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'price' | 'reservationPrice',
  ) => {
    const value = e.target.value;
    switch (feature) {
      case 'lead':
        dispatch(updateLeadField({ field, value }));
        break;
      case 'quote':
        dispatch(updateQuoteField({ field, value }));
        break;
      case 'order':
        dispatch(updateOrderField({ field, value }));
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    setLoadingType('save');
    leadConvert({ guid, price, reservationPrice, quote: false });
  };

  const handleSaveQuote = () => {
    setLoadingType('saveQuote');
    leadConvert({ guid, price, reservationPrice, quote: true });
  };

  const handleCancel = () => {
    switch (feature) {
      case 'lead':
        dispatch(resetLeadField({ field: 'price' }));
        dispatch(resetLeadField({ field: 'reservationPrice' }));
        break;
      case 'quote':
        dispatch(resetQuoteField({ field: 'price' }));
        dispatch(resetQuoteField({ field: 'reservationPrice' }));
        break;
      case 'order':
        dispatch(resetOrderField({ field: 'price' }));
        dispatch(resetOrderField({ field: 'reservationPrice' }));
        break;
      default:
        break;
    }
    onChangeInnerCollapse(keyValue);
  };

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <FeatItemLabel label="Total tariff" icon="total-tariff" />
        <Input
          value={price}
          onChange={(e) => handleChange(e, 'price')}
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <FeatItemLabel label="Reservation" icon="reservation" />
        <Input
          value={reservationPrice}
          onChange={(e) => handleChange(e, 'reservationPrice')}
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-end mt-5">
        <Button
          size="small"
          disabled={isLoadingLeadConvert || isLoading}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="ml-10"
          style={
            feature === 'lead'
              ? {
                  borderColor: '#1677ff',
                  color: '#1677ff',
                  backgroundColor: 'rgba(221, 242, 253, 1)',
                }
              : {}
          }
          type={feature === 'quote' ? 'primary' : 'default'}
          size="small"
          disabled={isLoading || isLoadingLeadConvert}
          loading={
            (isLoading && loadingType === 'save') || isLoadingLeadConvert
          }
          onClick={() => {
            if (feature === 'quote') {
              setDataUpdated(true);
              onSaveFeature();
              return;
            }
            handleSave();
          }}
        >
          Save
        </Button>
        {feature === 'lead' && (
          <Button
            className="ml-10"
            type="primary"
            size="small"
            disabled={isLoading || isLoadingLeadConvert}
            loading={isLoading && loadingType === 'saveQuote'}
            onClick={handleSaveQuote}
          >
            Save and send quote
          </Button>
        )}
      </div>
    </>
  );
}

export default FeatTotalTariffInner;
