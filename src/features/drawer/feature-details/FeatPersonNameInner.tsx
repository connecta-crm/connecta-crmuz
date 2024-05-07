import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatPersonNameInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(updateField({ field: 'customer.name', value }));
  };

  return (
    <div className="d-flex justify-between mb-5">
      <div className="form-label">Name</div>
      <Input
        value={leadData.customer.name}
        onChange={handleChange}
        style={{ width: 200, float: 'inline-end', height: 24 }}
      />
    </div>
  );
}

export default FeatPersonNameInner;
