import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import HighlightedWord from '../../../ui/HighlightedWord';
import { useCities } from '../../address/useCities';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../../leads/leadSlice';
import { isOrderData } from '../../leads/useCheckTypeData';
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

function FeatOriginInner({ feature }: FeatItemInnerProps) {
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

  const [isSelectCity, setSelectCity] = useState(true);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { cities, isLoading } = useCities(searchCity);

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };

  const handleChangeCity = (_: number | string, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      switch (feature) {
        case 'lead':
          dispatch(updateLeadField({ field: 'origin', value: option?.data }));
          break;
        case 'quote':
          dispatch(updateQuoteField({ field: 'origin', value: option?.data }));
          break;
        case 'order':
          dispatch(updateOrderField({ field: 'origin', value: option?.data }));
          break;
        default:
          break;
      }
    }
  };

  const handleChangeAddress = (field: string, value: string) => {
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

  // ORDER'S INPUTS
  const handleChangeInput = (field: string, value: string) => {
    dispatch(updateOrderField({ field, value }));
  };

  const handleSearchCity = (value: string) => {
    setSelectCity(false);
    setSearchCity(value);
  };

  if (!featureData) {
    return;
  }

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup address</div>
        <Input
          value={featureData?.originAddress}
          defaultValue={featureData?.originAddress}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChangeAddress('originAddress', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup city</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search city"
          defaultValue={featureData.origin.name}
          value={featureData.origin.name}
          onChange={handleChangeCity}
          onFocus={handleFocusCity}
          onSearch={handleSearchCity}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={
            isSelectCity || !searchCity ? null : isLoading ? (
              <Spin size="small" />
            ) : (
              'No such city'
            )
          }
        >
          {(cities || []).map(
            (d: {
              id: number;
              name: string;
              zip: string;
              state: { code: string };
            }) => (
              <Select.Option key={d.id} value={d.id} data={d}>
                {<HighlightedWord value={d.name} searchCity={searchCity} />}
                {`, ${d.state.code}, ${d.zip}`}
              </Select.Option>
            ),
          )}
        </Select>
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup state</div>
        <Input
          value={featureData.origin?.state?.name}
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup zip</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search zip"
          defaultValue={featureData.origin?.zip}
          value={featureData.origin.zip}
          onChange={handleChangeCity}
          onFocus={handleFocusCity}
          onSearch={handleSearchCity}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={
            isSelectCity || !searchCity ? null : isLoading ? (
              <Spin size="small" />
            ) : (
              'No such zip code'
            )
          }
        >
          {(cities || []).map(
            (d: {
              id: number;
              name: string;
              zip: string;
              state: { code: string };
            }) => (
              <Select.Option key={d.id} value={d.id} data={d}>
                {`${d.name}, ${d.state.code}, `}
                {<HighlightedWord value={d.zip} searchCity={searchCity} />}
              </Select.Option>
            ),
          )}
        </Select>
      </div>
      {/* ORDER CONTENTS */}
      {isOrderData(featureData) && (
        <>
          <div className="d-flex justify-between mb-5">
            <div className="form-label">Business name</div>
            <Input
              value={featureData.originBusinessName}
              defaultValue={featureData.originBusinessName}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeInput('originBusinessName', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="form-label">Business phone</div>
            <Input
              value={featureData.originBusinessPhone}
              defaultValue={featureData.originBusinessPhone}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeInput('originBusinessPhone', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="form-label required-label">Contact person</div>
            <Input
              value={featureData.originContactPerson}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeInput('originContactPerson', e.target.value)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex justify-between">
              <div className="form-label mr-5 required-label">Phone</div>
              <Input
                value={featureData.originPhone}
                defaultValue={featureData.originPhone}
                style={{ width: 115, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChangeInput('originPhone', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between ">
              <div className="form-label mr-5 pl-0">Second</div>
              <Input
                value={featureData.originSecondPhone}
                defaultValue={featureData.originSecondPhone}
                style={{ width: 115, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChangeInput('originSecondPhone', e.target.value)
                }
              />
            </div>
          </div>
          <div className="d-flex justify-between ">
            <div className="form-label required-label">Buyer number</div>
            <Input
              value={featureData.originBuyerNumber}
              defaultValue={featureData.originBuyerNumber}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChangeInput('originBuyerNumber', e.target.value)
              }
            />
          </div>
        </>
      )}
    </>
  );
}

export default FeatOriginInner;
