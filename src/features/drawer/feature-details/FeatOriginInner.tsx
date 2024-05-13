import { Input, Select, Spin } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useCities } from '../../address/useCities';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatOriginInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [isSelectCity, setSelectCity] = useState(false);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { cities, isLoading } = useCities(isSelectCity, searchCity);

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };

  const handleChangeCity = (_: number | string, option: { data: never }) => {
    if (!Array.isArray(option)) {
      dispatch(updateField({ field: 'origin', value: option?.data }));
    }
  };

  const handleSearchCity = (value: string) => {
    setSearchCity(value);
  };

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup city</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search city"
          defaultValue={leadData.origin.name}
          value={leadData.origin.name}
          onChange={handleChangeCity}
          onFocus={handleFocusCity}
          onSearch={handleSearchCity}
          style={{ width: 218 }}
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
        <div className="form-label required-label">Pickup state</div>
        <Input
          value={leadData.origin?.state.name}
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between">
        <div className="form-label required-label">Pickup zip</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search zip"
          defaultValue={leadData.origin?.zip}
          value={leadData.origin.zip}
          onChange={handleChangeCity}
          onFocus={handleFocusCity}
          onSearch={handleSearchCity}
          style={{ width: 218 }}
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

export default FeatOriginInner;
