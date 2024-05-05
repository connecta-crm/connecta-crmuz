import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import DownCollapse from '../../ui/Form/DownCollapse';
import Input from '../../ui/Form/Input';
import InputCol from '../../ui/Form/InputCol';
import InputRow from '../../ui/Form/InputRow';
import Label from '../../ui/Form/Label';
import { useCity } from '../leads/useLeadDetails';
type CityType = {
  id?: string;
  name?: string;
  state?: { id: string; name: string; code: string };
  zip?: string;
};


export default function Delivery({
  setDelivery,
}: {
  setDelivery: (a: string | null) => void;
}) {
  const [cityValue, setCityValue] = useState<CityType | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const citys = useCity(searchCity);

  const onChangeHandler = (value: string, data: DefaultOptionType) => {
    setDelivery(value);
    setCityValue(data.data);
    console.log(data);
  };

  return (
    <DownCollapse title="Delivery">
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
            onSearch={(value) => setSearchCity(value)}
            onChange={(
              value,
              record: DefaultOptionType | DefaultOptionType[],
            ) => onChangeHandler(value, record)}
            options={(citys || []).map((d: CityType) => ({
              value: d.id,
              data: d,
              label: d.name,
            }))}
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
            onChange={(
              value,
              record: DefaultOptionType | DefaultOptionType[],
            ) => onChangeHandler(value, record)}
            options={(citys || []).map((d: CityType) => ({
              value: d.id,
              data: d,
              label: d.zip,
            }))}
          />
        </InputCol>
      </InputRow>
    </DownCollapse>
  );
}
