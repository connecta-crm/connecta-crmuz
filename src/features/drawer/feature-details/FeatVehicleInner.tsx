import { DatePicker, Input, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import {
  LeadVehicle,
  updateVehicleField,
  type Vehicle,
} from '../../leads/leadSlice';
import { useCarMarks } from '../../vehicles/useCarMarks';
import { useCarModels } from '../../vehicles/useCarModels';

export type Record = {
  data: Vehicle;
};

type VehicleItemType = {
  vehicleIndex: number;
  vehicleItem: LeadVehicle;
};

function FeatVehicleInner({ vehicleIndex, vehicleItem }: VehicleItemType) {
  const dispatch = useAppDispatch();

  const { vehicleYear, vehicle } = vehicleItem;

  const [isSelectMark, setSelectMark] = useState(false);
  const [searchMark, setSearchMark] = useState<string | null>(null);

  const [isSelectModel, setSelectModel] = useState(false);
  const [searchModel, setSearchModel] = useState<string | null>(null);

  const { carMarks, isLoading } = useCarMarks(isSelectMark, searchMark);
  const { carModels, isLoading: isLoadingModel } = useCarModels(
    isSelectModel,
    searchModel,
    vehicle?.mark.id,
  );

  //   {
  //     id: 91,
  //     vehicle: {
  //       id: 80,
  //       mark: {
  //         id: 33,
  //         name: 'Mazda',
  //       },
  //       name: 'CX-30',
  //       vehicleType: 'SUV',
  //     },
  //     vehicleYear: 2024,
  //     lead: 121,
  //   },
  const handleChange = (_: number | string, record: Record | Record[]) => {
    if (!Array.isArray(record)) {
      console.log('mark', record.data);
      dispatch(
        updateVehicleField({
          vehicleIndex,
          field: 'vehicle.mark',
          value: record.data,
        }),
      );
      if (record.data.id && vehicle.mark?.id) {
        if (record.data.id !== vehicle.mark.id) {
          console.log('Not apppr');
          const mark = record.data;
          dispatch(
            updateVehicleField({
              vehicleIndex,
              field: 'vehicle',
              value: {
                mark,
                id: null,
                name: null,
                vehicleType: null,
              },
            }),
          );
        }
      }
    }
  };
  const handleChangeModel = (_: number | string, record: Record | Record[]) => {
    if (!Array.isArray(record)) {
      console.log('model', record.data);
      dispatch(
        updateVehicleField({
          vehicleIndex,
          field: 'vehicle',
          value: record.data,
        }),
      );
    }
  };

  const handleChangeDate = (_: number | string, value: string | string[]) => {
    if (!Array.isArray(value)) {
      dispatch(
        updateVehicleField({
          vehicleIndex,
          field: 'vehicleYear',
          value,
        }),
      );
    }
  };

  const handleSearchMark = (value: string) => {
    setSearchMark(value);
  };
  const handleSearchModel = (value: string) => {
    setSearchModel(value);
  };
  const handleFocusMark = () => {
    setSelectMark(true);
  };
  const handleFocusModel = () => {
    setSelectModel(true);
  };

  // const handleFocusCity = () => {
  //   // setSelectMark(true);
  // };
  // const handleSearchCity = () => {
  //   // setSelectMark(true);
  // };

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Vehicle year</div>
        <DatePicker
          format={{
            format: 'YYYY',
            type: 'mask',
          }}
          picker="year"
          allowClear={false}
          value={dayjs(String(vehicleYear), 'YYYY') as unknown as string}
          defaultValue={dayjs(String(vehicleYear), 'YYYY') as unknown as string}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={handleChangeDate}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Vehicle make</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search year"
          defaultValue={vehicle?.mark.name || ''}
          value={vehicle?.mark.name || ''}
          onChange={handleChange}
          onFocus={handleFocusMark}
          onSearch={handleSearchMark}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : 'No such make'}
          options={(carMarks || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Vehicle model</div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search modal"
          defaultValue={vehicle?.name || ''}
          value={vehicle?.name || ''}
          onChange={handleChangeModel}
          onFocus={handleFocusModel}
          onSearch={handleSearchModel}
          style={{ width: 218 }}
          loading={isLoadingModel}
          notFoundContent={
            isLoadingModel ? <Spin size="small" /> : 'No such model'
          }
          options={(carModels || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        />
      </div>
      <div className="d-flex justify-between ">
        <div className="form-label required-label">Vehicle type</div>
        <Input
          value={vehicle?.vehicleType || ''}
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
    </>
  );
}

export default FeatVehicleInner;
