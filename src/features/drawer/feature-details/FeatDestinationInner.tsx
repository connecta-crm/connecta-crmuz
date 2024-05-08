import { Input, Select, Spin } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useCities } from '../../address/useCities';
import { getLeadData, updateField, type Location } from '../../leads/leadSlice';

export type Record = {
  data: Location;
};

function FeatDestinationInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [isSelectCity, setSelectCity] = useState(false);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { cities, isLoading } = useCities(isSelectCity, searchCity);

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };

  const handleChangeCity = (id: number | string, option: Record | Record[]) => {
    if (!Array.isArray(option)) {
      dispatch(updateField({ field: 'destination', value: option?.data }));
    }
  };

  const handleSearchCity = (value: string) => {
    setSearchCity(value);
  };

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Delivery city</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search city"
          defaultValue={leadData.destination.name}
          value={leadData.destination.name}
          onChange={handleChangeCity}
          onFocus={handleFocusCity}
          onSearch={handleSearchCity}
          style={{ width: 200 }}
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : 'No such city'}
          options={(cities || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Delivery state</div>
        <Input
          value={leadData.destination?.state.name}
          disabled
          style={{ width: 200, float: 'inline-end', height: 24 }}
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
          style={{ width: 200 }}
          loading={isLoading}
          notFoundContent={
            isLoading ? <Spin size="small" /> : 'No such zip code'
          }
          options={(cities || []).map((d: { id: number; zip: string }) => ({
            value: d.id,
            data: d,
            label: d.zip,
          }))}
        />
      </div>
    </>
  );
}

export default FeatDestinationInner;
