import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatConditionInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (value: string) => {
    dispatch(updateField({ field: 'condition', value }));
  };
  return (
    <div className="d-flex justify-between">
      <div className="form-label">Condition</div>
      <Select
        value={leadData.condition}
        defaultValue={leadData.condition}
        style={{ width: 200, float: 'inline-end', height: 24 }}
        onChange={handleChange}
        options={[
          {
            label: 'Run and drives',
            value: 'run',
          },
          {
            label: 'Inop, it rolls',
            value: 'rols',
          },
          {
            label: 'Inop, need forklift',
            value: 'forklift',
          },
        ]}
      />
    </div>
  );
}

export default FeatConditionInner;
