import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useMake, useModel } from '../../features/leads/useLeadDetails';
import UseDatePicker from '../../ui/DatePicker/DatePicker';
import DownCollapse from '../../ui/Form/DownCollapse';
import Input from '../../ui/Form/Input';
import InputCol from '../../ui/Form/InputCol';
import InputRow from '../../ui/Form/InputRow';
import Label from '../../ui/Form/Label';

type DataType = {
  mark: string;
  q: string;
};

export default function Vehicle({
  setCarModel,
}: {
  setCarModel: (a: string | null) => void;
}) {
  const [modelValue, setModelValue] = useState<DefaultOptionType | null>(null);
  const [makeValue, setMakeValue] = useState<DefaultOptionType | null>(null);
  const [searchCarMake, setSearchCarMake] = useState('');
  const [searchCarModel, setSearchCarModel] = useState<
    DataType | DefaultOptionType
  >({ mark: '', q: '' });
  const [vhicleType, setVhicleType] = useState('');
  const makes = useMake(searchCarMake);
  const models = useModel(searchCarModel);

  // serach handle
  const handleSearchCar = (value: string, from: string) => {
    if (from === 'make') {
      setSearchCarMake(value);
      return;
    }
    if (from === 'model') {
      setSearchCarModel({ ...searchCarModel, q: value });
      return;
    }
  };

  const handleSelectMake = (
    value: DefaultOptionType | string,
    record: DefaultOptionType,
  ) => {
    setVhicleType('');
    setModelValue(null);
    setMakeValue(record);

    setSearchCarModel({ ...searchCarModel, mark: value, q: '' });
  };

  const handleSelectModel = (
    value: DefaultOptionType,
    record: DefaultOptionType,
  ) => {
    const d = record.data;
    setMakeValue({ value: d.mark.id, label: d.mark.name });
    setCarModel(d.id);
    setVhicleType(d?.vehicleType);
    setModelValue({ value: record.value, label: record.label });
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
            onChange={(data: DefaultOptionType, record) =>
              handleSelectMake(data, record)
            }
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
            onChange={(data, record: DefaultOptionType | DefaultOptionType[]) =>
              handleSelectModel(data, record)
            }
            options={(models || []).map((d: { id: string; name: string }) => ({
              value: d.id,
              data: d,
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
