import { Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ReactNode, useState } from 'react';
import DownCollapse from '../../ui/form/DownCollapse';
import Input from '../../ui/form/Input';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import Label from '../../ui/form/Label';
import { useCity } from '../leads/useLeadDetails';
import origin from '/img/drawer/destination.svg';
type CityType = {
  id?: string;
  name?: string;
  state?: { id: string; name: string; code: string };
  zip?: string;
};

export default function Delivery({
  setDelivery,
  children
}: {
  setDelivery: (a: string | null) => void;
  children?:ReactNode
}) {
  // const [enabled, setEnabled] = useState(false);
  const [cityValue, setCityValue] = useState<CityType | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const { citys, isFetching: isLoading } = useCity(searchCity);

  const onChangeHandler = (value: string, data: DefaultOptionType) => {
    setDelivery(value);
    setCityValue(data.data);
  };

  return (
    <DownCollapse title="Destination" img={origin}>
      <InputRow>
        <InputCol>
          <Label>Delivery city</Label>
        </InputCol>
        <InputCol>
          <Select
            showSearch
            value={cityValue?.name}
            optionFilterProp="children"
            placeholder={'Search  city'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            // onFocus={() => setEnabled(true)}
            loading={isLoading}
            notFoundContent={isLoading ? <Spin size="small" /> : 'No data'}
            onSearch={(value) => setSearchCity(value)}
            onChange={(
              value,
              record: DefaultOptionType | DefaultOptionType[],
            ) => onChangeHandler(value, record)}
            options={(citys || []).map(
              (d: {
                id: number;
                name: string;
                zip: string;
                state: { code: string };
              }) => ({
                value: d.id,
                data: d,
                label: d.name + ', ' + d.state.code + ' ' + d.zip,
              }),
            )}
          />
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Delivery state</Label>
        </InputCol>

        <InputCol>
          <Input
            type="text"
            placeholder="Empty"
            name="disabled_value"
            defaultValue={cityValue?.state?.name}
          />
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Delivery zip</Label>
        </InputCol>

        <InputCol>
          <Select
            showSearch
            value={cityValue?.zip}
            optionFilterProp="children"
            placeholder={'Search  zip'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={(value) => setSearchCity(value)}
            // onFocus={() => setEnabled(true)}
            loading={isLoading}
            notFoundContent={isLoading ? <Spin size="small" /> : 'No data'}
            onChange={(
              value,
              record: DefaultOptionType | DefaultOptionType[],
            ) => onChangeHandler(value, record)}
            options={(citys || []).map(
              (d: {
                id: number;
                name: string;
                zip: string;
                state: { code: string };
              }) => ({
                value: d.id,
                data: d,
                label: d.name + ', ' + d.state.code + ' ' + d.zip,
              }),
            )}
          />
        </InputCol>
      </InputRow>
      {
        children
      }
    </DownCollapse>
  );
}
