import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatTrailertypeInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (value: string) => {
    dispatch(updateField({ field: 'trailerType', value }));
  };
  return (
    <div className="d-flex justify-between">
      <div className="form-label">Trailer Type</div>
      <Select
        value={leadData.trailerType}
        defaultValue={leadData.trailerType}
        style={{ width: 200, float: 'inline-end', height: 24 }}
        onChange={handleChange}
        options={[
          {
            label: 'Open',
            value: 'open',
          },
          {
            label: 'Enclosed',
            value: 'enclosed',
          },
        ]}
      />
    </div>
  );
}

export default FeatTrailertypeInner;
