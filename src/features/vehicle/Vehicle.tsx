import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { useMake, useModel } from '../../features/leads/useLeadDetails';
import DownCollapse from '../../ui/form/DownCollapse';
// import Input from '../../ui/form/Input';
import FormItem from 'antd/es/form/FormItem';
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
  type,
}: {
  title: string;
  vehicleAdd: (car: CarType) => void;
  vehicleRemove: () => void;
  getCarValue: (a: CarType) => void;
  carId: number;
  type?: boolean;
}) {
  console.log(type);

  const [carValue, setCarValue] = useState<CarType>({
    id: carId,
    vehicle: '',
    vehicleYear: '',
    vin: '',
    lot: '',
    color: '',
    plate: '',
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
          />
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Type</Label>
        </InputCol>
        <InputCol>
          <FormItem
            style={{ margin: '0', width: '100%' }}
            rules={[{ required: true, message: '' }]}
          >
            <Input value={vhicleType} style={{ width: '100%' }} />
          </FormItem>
        </InputCol>
      </InputRow>
      {type && (
        <>
          <div className="vehicle__details">
            <div className="vehicle__details__left">
              <Label>Lot</Label>
              <FormItem
                style={{ margin: '0', minHeight: '0px' }}
                rules={[{ required: true, message: '' }]}
              >
                <Input
                  onChange={(e) =>
                    setCarValue({ ...carValue, lot: e.target.value })
                  }
                  style={{ padding: '3px 5px' }}
                />
              </FormItem>
            </div>
            <div className="vehicle__details__right">
              <Label>VIN</Label>
              <FormItem
                style={{ margin: '0', minHeight: '0px' }}
                rules={[{ required: true, message: '' }]}
              >
                <Input
                  onChange={(e) =>
                    setCarValue({ ...carValue, vin: e.target.value })
                  }
                  style={{ padding: '3px 5px' }}
                />
              </FormItem>
            </div>
          </div>

          <div className="vehicle__details">
            <div className="vehicle__details__left">
              <Label>Color</Label>
              <FormItem
                style={{ margin: '0', minHeight: '0px' }}
                rules={[{ required: true, message: '' }]}
              >
                <Input
                  onChange={(e) =>
                    setCarValue({ ...carValue, color: e.target.value })
                  }
                  style={{ padding: '3px 5px' }}
                />
              </FormItem>
            </div>
            <div className="vehicle__details__right">
              <Label>Plate</Label>
              <FormItem
                style={{ margin: '0', minHeight: '0px' }}
                rules={[{ required: true, message: '' }]}
              >
                <Input
                  onChange={(e) =>
                    setCarValue({ ...carValue, plate: e.target.value })
                  }
                  style={{ padding: '3px 5px' }}
                />
              </FormItem>
            </div>
          </div>
        </>
      )}
    </DownCollapse>
  );
}
