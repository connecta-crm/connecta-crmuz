import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatReservationInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateField({ field: 'reservationPrice', value }));
  };

  return (
    <div className="d-flex justify-between mb-5">
      <div className="form-label">Reservation</div>
      <Input
        value={leadData.reservationPrice}
        onChange={handleChange}
        style={{ width: 218, float: 'inline-end', height: 24 }}
      />
    </div>
  );
}

export default FeatReservationInner;
