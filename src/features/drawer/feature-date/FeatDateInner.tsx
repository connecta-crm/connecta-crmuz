import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';

function FeatDateInner({ sourceType }: DrawerSourceType) {
  const dispatch = useAppDispatch();

  const orderData = useAppSelector(getOrderData);

  let data;

  switch (sourceType) {
    case 'order':
      data = orderData;
      break;
    default:
      break;
  }

  const handleChange = (field: string, value: string | string[]) => {
    if (!Array.isArray(value)) {
      switch (sourceType) {
        case 'order':
          dispatch(updateOrderField({ field, value }));
          break;
        default:
          break;
      }
    }
  };

  if (!data) {
    return;
  }

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Est. Ship Date</div>
        </div>
        <DatePicker
          format={{
            format: 'MM-DD-YYYY',
            type: 'mask',
          }}
          allowClear={false}
          type="date"
          name="est_ship_date"
          value={
            dayjs(data.dates?.dateEstShip, 'MM-DD-YYYY') as unknown as string
          }
          defaultValue={
            dayjs(data.dates?.dateEstShip, 'MM-DD-YYYY') as unknown as string
          }
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) => handleChange('dates.dateEstShip', record)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Est. PU Date</div>
        </div>
        <DatePicker
          format={{
            format: 'MM-DD-YYYY',
            type: 'mask',
          }}
          allowClear={false}
          type="date"
          name="est_pu_date"
          value={
            dayjs(data.dates?.dateEstPu, 'MM-DD-YYYY') as unknown as string
          }
          defaultValue={
            dayjs(data.dates?.dateEstPu, 'MM-DD-YYYY') as unknown as string
          }
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) => handleChange('dates.dateEstPu', record)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Est. DEL Date</div>
        </div>
        <DatePicker
          format={{
            format: 'MM-DD-YYYY',
            type: 'mask',
          }}
          allowClear={false}
          type="date"
          name="est_del_date"
          value={
            dayjs(data.dates?.dateEstDel, 'MM-DD-YYYY') as unknown as string
          }
          defaultValue={
            dayjs(data.dates?.dateEstDel, 'MM-DD-YYYY') as unknown as string
          }
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) => handleChange('dates.dateEstDel', record)}
        />
      </div>
    </>
  );
}

export default FeatDateInner;
