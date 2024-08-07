import { Button, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import {
  useCreateModel,
  useMake,
  useModel,
} from '../../features/leads/useLeadDetails';
import DownCollapse from '../../ui/form/DownCollapse';
// import Input from '../../ui/form/Input';
import FormItem from 'antd/es/form/FormItem';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import Label from '../../ui/form/Label';
import UseDatePicker from '../../ui/picker/DatePicker';
import { CarType } from './VehicleContainer';
import { VEHICLE_TYPE } from '../../utils/constants';

type DataType = {
  mark: string;
  q: string;
};
export type NewCarModel = {
  name: string;
  vehicleType: string;
  isActive: boolean;
  mark: string;
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
  const [carValue, setCarValue] = useState<CarType>({
    id: carId,
    vehicle: '',
    vehicleYear: '',
    vin: '',
    lot: '',
    color: '',
    plate: '',
    type:""
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

  const { createModel, isLoadingModel } = useCreateModel();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [create, setCreate] = useState(false);
  const [newCar, setNewCar] = useState<NewCarModel>({
    name: '',
    isActive: true,
    vehicleType: '',
    mark: '',
  });

  const onCreateModel = () => {
    createModel(newCar, {
      onSuccess: () => {
        setNewCar({ name: '', isActive: true, vehicleType: '', mark: '' });
        setCreate(false)
      },
    });
  };

  useEffect(()=>{
  setCarValue({...carValue,type:vhicleType})
  },[vhicleType])

  useEffect(() => {
    if (newCar.isActive && newCar.mark && newCar.name && newCar.vehicleType) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [newCar]);

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
      setNewCar({ ...newCar, name: value });
      return;
    }
  };

  const handleSelectMake = (
    value: DefaultOptionType | string,
    record: DefaultOptionType,
  ) => {
    setNewCar({ ...newCar, mark: value as string });
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
          {create ? (
            <input
              value={newCar.name}
              type="text"
              placeholder="Enter model name"
              onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            />
          ) : (
            <Select
              value={modelValue ? modelValue : null}
              showSearch
              optionFilterProp="children"
              placeholder={'Search model'}
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              onKeyUp={() => setModelEnabled(true)}
              loading={isFetching}
              notFoundContent={
                isFetching ? (
                  <Spin size="small" />
                ) : (
                  <Button onClick={() => setCreate(true)} size="small">
                    create
                  </Button>
                )
              }
              filterOption={false}
              onSelect={() => null}
              onSearch={(value) => handleSearchCar(value, 'model')}
              onChange={(
                data,
                record: DefaultOptionType | DefaultOptionType[],
              ) => handleSelectModel(data, record)}
              options={(models || []).map(
                (d: { id: string; name: string }) => ({
                  value: d.id,
                  data: d,
                  label: d.name,
                }),
              )}
            />
          )}
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Type</Label>
        </InputCol>
        <InputCol>
          {create ? (
            <Select
              style={{ width: '100%' }}
              onChange={(a) => setNewCar({ ...newCar, vehicleType: a })}
              placeholder="Select a type"
              options={VEHICLE_TYPE}
            />
          ) : (
            <FormItem
              style={{ margin: '0', width: '100%' }}
              rules={[{ required: true, message: '' }]}
            >
              <Input value={vhicleType} style={{ width: '100%' }} />
            </FormItem>
          )}
        </InputCol>
      </InputRow>
      <InputRow>
        {create && (
          <div className=" w-100 d-flex justify-end">
            <Button size="small" onClick={() => setCreate(false)}>
              cancel
            </Button>
            <Button
              disabled={!disabled || isLoadingModel}
              onClick={() => onCreateModel()}
              size="small"
              type="primary"
              className="ml-5"
            >
              
                <>
                 { isLoadingModel &&
                  <Spin size="small" />} Save
                </>
              
            </Button>
          </div>
        )}
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
