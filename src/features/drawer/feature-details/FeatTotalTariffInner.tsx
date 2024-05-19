import { LoadingOutlined } from '@ant-design/icons';
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
import {
  getQuoteData,
  resetField as resetQuoteField,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';
import { FeatItemInnerProps } from './FeatConditionInner';

function FeatTotalTariffInner({ keyValue, feature }: FeatItemInnerProps) {
  const [loadingType, setLoadingType] = useState('save');
  const dispatch = useAppDispatch();
  const { onChangeInnerCollapse, closeDrawer } = useDrawerFeature();
  const { leadConvert, isLoading, error, isSuccess } = useLeadConvert();

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

  useEffect(() => {
    if (!isLoading && !error && isSuccess) {
      closeDrawer();
    }
  }, [isLoading, error, isSuccess]);

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
      default:
        break;
    }
    onChangeInnerCollapse(keyValue);
  };

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label">Total tariff</div>
        <Input
          value={price}
          onChange={(e) => handleChange(e, 'price')}
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label">Reservation</div>
        <Input
          value={reservationPrice}
          onChange={(e) => handleChange(e, 'reservationPrice')}
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-end mt-5">
        <Button size="small" disabled={isLoading} onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          className="ml-10"
          style={{
            borderColor: '#1677ff',
            color: '#1677ff',
            backgroundColor: 'rgba(221, 242, 253, 1)',
          }}
          size="small"
          disabled={isLoading}
          onClick={handleSave}
        >
          {isLoading && loadingType === 'save' ? <LoadingOutlined /> : 'Save'}
        </Button>
        <Button
          className="ml-10"
          type="primary"
          size="small"
          disabled={isLoading}
          onClick={handleSaveQuote}
        >
          {isLoading && loadingType === 'saveQuote' ? (
            <>
              <span>Save and send quote </span>
              <LoadingOutlined />
            </>
          ) : (
            'Save and send quote'
          )}
        </Button>
      </div>
    </>
  );
}

export default FeatTotalTariffInner;
