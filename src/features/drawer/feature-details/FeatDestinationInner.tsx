import { Input, Select, Spin } from 'antd';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useCities } from '../../address/useCities';
import { getLeadData, updateField, type Location } from '../../leads/leadSlice';

// const cityData = {
//   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };

// type CityName = keyof typeof cityData;

// const stateData: CityName[] = ['Zhejiang', 'Jiangsu'];

function FeatDestinationInner() {
  /* eslint-disable @typescript-eslint/no-unused-vars */

  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const [isSelectCity, setSelectCity] = useState(false);
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { cities, isLoading } = useCities(isSelectCity, searchCity);

  console.log(isLoading, 'loading');
  console.log(cities, 'cities');

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };
  type Record = {
    data: Location;
  };
  const handleChangeCity = (id: number, record: Record) => {
    dispatch(updateField({ field: 'destination', value: record?.data }));
    console.log('handleChangeCity', id);
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
          defaultValue={leadData.destination.id}
          value={leadData.destination.id}
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
          placeholder="Search city"
          defaultValue={leadData.destination?.zip}
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
      {/* <Select
          showSearch
          value={leadData.destination?.state?.name || ''}
          optionFilterProp="children"
          placeholder="Search city"
          // style={{ width: '100%' }}
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={(value) => setSearchCity(value)}
          onChange={(data, record) => handleChangeCity(data, record)}
          options={(citys || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        /> */}
    </>
  );
}

export default FeatDestinationInner;
