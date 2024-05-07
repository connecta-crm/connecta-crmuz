import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatPersonEmailInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateField({ field: 'customer.email', value }));
  };

  return (
    <div className="d-flex justify-between mb-5">
      <div className="form-label">Email</div>
      <Input
        value={leadData.customer.email}
        onChange={handleChange}
        style={{ width: 200, float: 'inline-end', height: 24 }}
      />
    </div>
  );
}

export default FeatPersonEmailInner;
