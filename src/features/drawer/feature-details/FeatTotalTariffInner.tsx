import { LoadingOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDrawerFeature } from '../../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getLeadData,
  resetField as resetLeadField,
  updateField,
} from '../../leads/leadSlice';
import { useLeadConvert } from '../../leads/useLeadConvert';

function FeatTotalTariffInner({ keyValue }: { keyValue: string }) {
  const [loadingType, setLoadingType] = useState('save');
  const dispatch = useAppDispatch();
  const { guid, price, reservationPrice } = useAppSelector(getLeadData);
  const { onChangeInnerCollapse, closeDrawer } = useDrawerFeature();

  const { leadConvert, isLoading, error, isSuccess } = useLeadConvert();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: 'price' | 'reservationPrice',
  ) => {
    const value = e.target.value;
    dispatch(updateField({ field, value }));
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
    dispatch(resetLeadField({ field: 'price' }));
    dispatch(resetLeadField({ field: 'reservationPrice' }));
    onChangeInnerCollapse(keyValue);
  };

  useEffect(() => {
    if (!isLoading && !error && isSuccess) {
      closeDrawer();
    }
  }, [isLoading, error, isSuccess]);

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label">Total tariff</div>
        <Input
          value={price}
          onChange={(e) => handleChange(e, 'price')}
          style={{ width: 200, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label">Reservation</div>
        <Input
          value={reservationPrice}
          onChange={(e) => handleChange(e, 'reservationPrice')}
          style={{ width: 200, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-end mt-10">
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
