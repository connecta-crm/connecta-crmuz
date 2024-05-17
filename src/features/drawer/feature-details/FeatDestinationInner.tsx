import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import HighlightedWord from '../../../ui/HighlightedWord';
import { useCities } from '../../address/useCities';
import { getLeadData, updateField, type Location } from '../../leads/leadSlice';

export type Record = {
  data: Location;
};

function FeatDestinationInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [isSelectCity, setSelectCity] = useState(true);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { cities, isLoading } = useCities(searchCity);

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };

  const handleChangeCity = (_: number | string, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      dispatch(updateField({ field: 'destination', value: option?.data }));
    }
  };

  const handleSearchCity = (value: string) => {
    setSelectCity(false);
    setSearchCity(value);
  };

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
          defaultValue={leadData.destination.name}
          value={leadData.destination.name}
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
          value={leadData.destination?.state.name}
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
          defaultValue={leadData.destination?.zip}
          value={leadData.destination.zip}
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
