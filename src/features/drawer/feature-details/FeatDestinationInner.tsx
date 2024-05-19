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
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';
import { FeatItemInnerProps } from './FeatConditionInner';

function FeatDestinationInner({ feature }: FeatItemInnerProps) {
  const dispatch = useAppDispatch();
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
          dispatch(
            updateLeadField({ field: 'destination', value: option?.data }),
          );
          break;
        case 'quote':
          dispatch(
            updateQuoteField({ field: 'destination', value: option?.data }),
          );
          break;
        default:
          break;
      }
    }
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
        <div className="form-label required-label">Delivery city</div>
        <Select
          showSearch
          defaultActiveFirstOption={false}
          suffixIcon={null}
          filterOption={false}
          size="small"
          optionFilterProp="children"
          placeholder="Search city"
          defaultValue={featureData.destination.name}
          value={featureData.destination.name}
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
        <div className="form-label required-label">Delivery state</div>
        <Input
          value={featureData.destination?.state.name}
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between">
        <div className="form-label required-label">Delivery zip</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search zip"
          defaultValue={featureData.destination?.zip}
          value={featureData.destination.zip}
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
    </>
  );
}

export default FeatDestinationInner;
