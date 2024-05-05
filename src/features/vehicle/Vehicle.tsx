import { Select } from 'antd';
import { useState } from 'react';
import { useMake, useModel } from '../../features/leads/useLeadDetails';
import UseDatePicker from '../../ui/DatePicker/DatePicker';
import DownCollapse from '../../ui/Form/DownCollapse';
import InputCol from '../../ui/Form/InputCol';
import InputRow from '../../ui/Form/InputRow';
import Label from '../../ui/Form/Label';
import Input from '../../ui/Form/Input';
import { DefaultOptionType } from 'antd/es/select';

export default function Vehicle({setCarModel}:{setCarModel:(a:string|null)=>void}) {
  
  const [modelValue, setModelValue] = useState<{value:string,label:string}| null>(null);
  const [makeValue, setMakeValue] = useState<{value:string,label:string}| null>(null);
  const [searchCarMake, setSearchCarMake] = useState('');
  const [searchCarModel, setSearchCarModel] = useState({ mark: '', q: '' });
    const [vhicleType, setVhicleType] = useState('');
  const makes = useMake(searchCarMake);
  const models = useModel(searchCarModel);

  // serach handle
  const handleSearchCar = (value: string, from: string) => {
    console.log(value);

    if (from === 'make') {
      setSearchCarMake(value);
      return;
    }
    if (from === 'model') {
      setSearchCarModel({ ...searchCarModel, q: value });
      return;
    }
  };

  const handleSelectMake = (value: string | null, record:DefaultOptionType) => {
    setVhicleType("")
    setModelValue(null);
    setMakeValue(record);
    setSearchCarModel({ ...searchCarModel, mark: value ? value : '', q: '' });
  };

  const handleSelectModel = (value: string | null, record:DefaultOptionType) => {
    const d = record.data
    setMakeValue({ value: d.mark.id, label: d.mark.name });
    setCarModel(value)
    setVhicleType(d?.vehicleType)
    // setModelValue({value:record.value,label:record.label});
    console.log(record);
    
  };

  return (
    <DownCollapse title="Vehicle">
      <InputRow>
        <InputCol>
          <Label>Vehicle year</Label>
        </InputCol>

        <InputCol>
          <UseDatePicker type="year" name="vehicle_year" />
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Vehicle make</Label>
        </InputCol>

        <InputCol>
          <Select
            showSearch
            value={makeValue ? makeValue : null}
            optionFilterProp="children"
            placeholder={'Search  make'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={(value) => handleSearchCar(value, 'make')}
            onChange={(data, record) => handleSelectMake(data, record)}
            options={(makes || []).map((d: { id: string; name: string }) => ({
              value: d.id,
              label: d.name,
            }))}
          />
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Vehicle model</Label>
        </InputCol>

        <InputCol>
          <Select
            value={modelValue ? modelValue : null}
            showSearch
            optionFilterProp="children"
            placeholder={'Search model'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSelect={() => null}
            onSearch={(value) => handleSearchCar(value, 'model')}
            onChange={(data, record: DefaultOptionType | DefaultOptionType[]) => handleSelectModel(data, record)}
            options={(models || []).map((d: { id: string; name: string }) => ({
              value: d.id,
              data:d,
              label: d.name,
            }))}
          />{' '}
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Type</Label>
        </InputCol>
        <InputCol>
          <Input
            defaultValue={vhicleType}
            name="vehicl_type"
            type="text"
            placeholder="Vehicle type"
          />
        </InputCol>
      </InputRow>
    </DownCollapse>
  );
}
