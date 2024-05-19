import { Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ReactNode, useEffect, useState } from 'react';
import { useMake, useModel } from '../../features/leads/useLeadDetails';
import DownCollapse from '../../ui/form/DownCollapse';
import Input from '../../ui/form/Input';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import Label from '../../ui/form/Label';
import UseDatePicker from '../../ui/picker/DatePicker';
import { CarType } from './VehicleContainer';

type DataType = {
  mark: string;
  q: string;
};

export default function Vehicle({
  title,
  vehicleAdd,
  vehicleRemove,
  getCarValue,
  carId,
  children,
}: {
  title: string;
  vehicleAdd: (car: CarType) => void;
  vehicleRemove: () => void;
  getCarValue: (a: CarType) => void;
  carId: number;
  children: ReactNode;
}) {
  const [carValue, setCarValue] = useState<CarType>({
    id: carId,
    vehicle: '',
    vehicleYear: '',
  });
  const [modelValue, setModelValue] = useState<DefaultOptionType | null>(null);
  const [makeValue, setMakeValue] = useState<DefaultOptionType | null>(null);
  const [searchCarMake, setSearchCarMake] = useState('');
  const [searchCarModel, setSearchCarModel] = useState<
    DataType | DefaultOptionType
  >({ mark: '', q: '' });
  const [vhicleType, setVhicleType] = useState('');
  const [modelEnabled, setModelEnabled] = useState(false);
  const { makes, isFetching: isLoading } = useMake(searchCarMake);
  const { models, isFetching } = useModel(searchCarModel, modelEnabled);

  useEffect(() => {
    getCarValue(carValue);
  }, [carValue]);

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
    console.log(value);

    const d = record.data;
    setMakeValue({ value: d.mark.id, label: d.mark.name });
    setCarValue({ ...carValue, vehicle: d.id });

    setVhicleType(d?.vehicleType);
    setModelValue({ value: record.value, label: record.label });
  };

  const getYear = (date: string) => {
    setCarValue({ ...carValue, vehicleYear: date });
  };

  return (
    <DownCollapse
      vehicleRemove={vehicleRemove}
      vehicleAdd={vehicleAdd}
      title={title}
    >
      <InputRow>
        <InputCol>
          <Label>Vehicle year</Label>
        </InputCol>

        <InputCol>
          <UseDatePicker getYear={getYear} type="year" name="vehicle_year" />
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
            loading={isLoading}
            notFoundContent={isLoading ? <Spin size="small" /> : 'No data'}
            onSearch={(value) => {
              handleSearchCar(value, 'make');
              setModelEnabled(true);
            }}
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
            onKeyUp={() => setModelEnabled(true)}
            loading={isFetching}
            notFoundContent={isFetching ? <Spin size="small" /> : 'No data'}
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
            name="disabled_value"
            type="text"
            placeholder="Vehicle type"
          />
        </InputCol>
      </InputRow>
      {children}
    </DownCollapse>
  );
}
