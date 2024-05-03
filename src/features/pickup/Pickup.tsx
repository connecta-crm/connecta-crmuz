import DownCollapse from "../../ui/Form/DownCollapse";
import Label from "../../ui/Form/Label";
import InputRow from "../../ui/Form/InputRow";
import InputCol from "../../ui/Form/InputCol";
import { Select } from "antd";
import { useState } from "react";
import { useCity } from "../leads/useLeadDetails";
import Input from "../../ui/Form/Input";
export default function Pickup() {
    const [cityValue, setCityValue] = useState(null);
    const [searchCity, setSearchCity] = useState('');
    const citys = useCity(searchCity);
  return (
    
    <DownCollapse title="Pickup">
    <InputRow>
      <InputCol>
        <Label>Pickup city</Label>
      </InputCol>
      <InputCol>
        <Select
          showSearch
          value={cityValue?.name}
          optionFilterProp="children"
          placeholder={'Search  make'}
          style={{ width: '100%' }}
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={(value) => setSearchCity(value)}
          onChange={(data,record) => setCityValue(record?.data)}
          options={(citys || []).map(
            (d: { id: number; name: string }) => ({
              value: d.id,
              data:d,
              label: d.name,
            }),
          )}
        />
      </InputCol>
    </InputRow>
    <InputRow>
      <InputCol>
        <Label>Pickup state</Label>
      </InputCol>

      <InputCol>
        <Input type="text" placeholder="Empty" name="disabled_value" defaultValue={cityValue?.state?.name} />
      </InputCol>
    </InputRow>
    <InputRow>
      <InputCol>
        <Label>Pickup zip</Label>
      </InputCol>

      <InputCol>
        <Select
          showSearch
          value={cityValue?.zip}
          optionFilterProp="children"
          placeholder={'Search  make'}
          style={{ width: '100%' }}
          defaultActiveFirstOption={false}
          filterOption={false}
          onSearch={(value) => setSearchCity(value)}
          onChange={(data,record) => setCityValue(record?.data)}
          options={(citys || []).map(
            (d: { id: number; zip: string }) => ({
              value: d.id,
              data:d,
              label: d.zip,
            }),
          )}
        />
      </InputCol>
    </InputRow>
  </DownCollapse>
  )
}
