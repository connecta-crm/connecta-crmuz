import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatOriginInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (value: string) => {
    dispatch(updateField({ field: 'condition', value }));
  };
  return (
    <div className="d-flex justify-between">
      <div className="form-label">Pickup city</div>
      <Select
        value={leadData.condition}
        defaultValue={leadData.condition}
        style={{ width: 200, float: 'inline-end', height: 24 }}
        onChange={handleChange}
        options={[
          {
            label: 'Run',
            value: 'run',
          },
          {
            label: 'Rols',
            value: 'rols',
          },
          {
            label: 'Forklift',
            value: 'forklift',
          },
        ]}
      />
    </div>
  );
}

export default FeatOriginInner;
