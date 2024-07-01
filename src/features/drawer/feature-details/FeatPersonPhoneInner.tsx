import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../../leads/leadSlice';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';
import { FeatItemInnerProps } from './FeatConditionInner';
import { FeatureData } from './FeatDestinationInner';

function FeatPersonPhoneInner({ feature }: FeatItemInnerProps) {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

  let featureData: FeatureData | undefined;

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (feature) {
      case 'lead':
        dispatch(updateLeadField({ field: 'customer.phone', value }));
        break;
      case 'quote':
        dispatch(updateQuoteField({ field: 'customer.phone', value }));
        break;
      case 'order':
        dispatch(updateOrderField({ field: 'customer.phone', value }));
        break;
      default:
        break;
    }
  };

  if (!featureData) {
    return;
  }

  return (
    <div className="d-flex justify-between mb-5">
      <div className="form-label">Phone</div>
      <Input
        value={featureData.customer.phone}
        onChange={handleChange}
        style={{ width: 218, float: 'inline-end', height: 24 }}
      />
    </div>
  );
}

export default FeatPersonPhoneInner;
