import { DatePicker, Input, Select, Spin } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  LeadVehicle,
  OrderVehicle,
  QuoteVehicle,
  Vehicle,
} from '../../../models';
import { useAppDispatch } from '../../../store/hooks';
import { SourceType } from '../../../ui/Drawer';
import { updateVehicleField as updateLeadVehicleField } from '../../leads/leadSlice';
import { updateVehicleField as updateOrderVehicleField } from '../../orders/orderSlice';
import { updateVehicleField as updateQuoteVehicleField } from '../../quotes/quoteSlice';
import { useCarMarks } from '../../vehicles/useCarMarks';
import { useCarModels } from '../../vehicles/useCarModels';

export type Record = {
  data: Vehicle;
};

type VehicleItemType = {
  feature: SourceType;
  vehicleIndex: number;
  vehicleItem: LeadVehicle | QuoteVehicle | OrderVehicle;
};

function FeatVehicleInner({
  feature,
  vehicleIndex,
  vehicleItem,
}: VehicleItemType) {
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

  const handleChangeSelect = (field: string, record: Record | Record[]) => {
    if (!Array.isArray(record)) {
      switch (feature) {
        case 'lead':
          dispatch(
            updateLeadVehicleField({
              vehicleIndex,
              field,
              value: record.data,
            }),
          );
          break;
        case 'quote':
          dispatch(
            updateQuoteVehicleField({
              vehicleIndex,
              field,
              value: record.data,
            }),
          );
          break;
        case 'order':
          dispatch(
            updateOrderVehicleField({
              vehicleIndex,
              field,
              value: record.data,
            }),
          );
          break;
      }

      if (record.data.id && vehicle.mark?.id && field === 'vehicle.mark') {
        if (record.data.id !== vehicle.mark.id) {
          const mark = record.data;
          switch (feature) {
            case 'lead':
              dispatch(
                updateLeadVehicleField({
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
              break;
            case 'quote':
              dispatch(
                updateQuoteVehicleField({
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
              break;
            case 'order':
              dispatch(
                updateOrderVehicleField({
                  vehicleIndex,
                  field: 'vehicle',
                  value: {
                    mark,
                    id: null,
                    name: null,
                    vehicleType: null,
                    isActive: true,
                  },
                }),
              );
              break;
          }
        }
      }
    }
  };

  const handleChangeDate = (field: string, value: string | string[]) => {
    if (!Array.isArray(value)) {
      switch (feature) {
        case 'lead':
          dispatch(
            updateLeadVehicleField({
              vehicleIndex,
              field,
              value,
            }),
          );
          break;
        case 'quote':
          dispatch(
            updateQuoteVehicleField({
              vehicleIndex,
              field,
              value,
            }),
          );
          break;
        case 'order':
          dispatch(
            updateOrderVehicleField({
              vehicleIndex,
              field,
              value,
            }),
          );
          break;
      }
    }
  };

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
          onChange={(_, record: string | string[]) =>
            handleChangeDate('vehicleYear', record)
          }
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
          onChange={(_, record: Record | Record[]) =>
            handleChangeSelect('vehicle.mark', record)
          }
          onFocus={() => setSelectMark(true)}
          onSearch={(value) => setSearchMark(value)}
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
          onChange={(_, record: Record | Record[]) =>
            handleChangeSelect('vehicle', record)
          }
          onFocus={() => setSelectModel(true)}
          onSearch={(value) => setSearchModel(value)}
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
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Vehicle type</div>
        <Input
          value={vehicle?.vehicleType || ''}
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      {/* ORDER features */}
      <div className="d-flex justify-between">
        <div className="">
          <div className="d-flex justify-between mb-5">
            <div className="form-label mr-5 pl-0">Lot</div>
            <Input
              value={vehicleItem?.lot || ''}
              style={{ width: 86, float: 'inline-end', height: 24 }}
            />
          </div>
          <div className="d-flex justify-between ">
            <div className="form-label mr-5 pl-0">Color</div>
            <Input
              value={vehicleItem?.color || ''}
              style={{ width: 86, float: 'inline-end', height: 24 }}
            />
          </div>
        </div>
        <div className="ml-10">
          <div className="d-flex justify-between mb-5">
            <div className="form-label mr-5 pl-0">VIN</div>
            <Input
              value={vehicleItem?.vin || ''}
              style={{ width: 178, float: 'inline-end', height: 24 }}
            />
          </div>
          <div className="d-flex justify-between">
            <div className="form-label mr-5 pl-0">Plate</div>
            <Input
              value={vehicleItem?.plate || ''}
              style={{ width: 178, float: 'inline-end', height: 24 }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatVehicleInner;
