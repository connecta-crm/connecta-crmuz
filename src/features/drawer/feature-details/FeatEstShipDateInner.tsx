import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatEstShipDateInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (_: string, value: string | string[]) => {
    if (!Array.isArray(value)) {
      dispatch(updateField({ field: 'dateEstShip', value }));
    }
  };
  return (
    <div className="d-flex justify-between">
      <div className="form-label">Est. ship date</div>
      <DatePicker
        format={{
          format: 'YYYY-MM-DD',
          type: 'mask',
        }}
        type="date"
        name="est_ship_date"
        value={dayjs(leadData.dateEstShip, 'YYYY-MM-DD')}
        defaultValue={dayjs(leadData.dateEstShip, 'YYYY-MM-DD')}
        style={{ width: 200, float: 'inline-end', height: 24 }}
        onChange={handleChange}
      />
    </div>
  );
}

export default FeatEstShipDateInner;
