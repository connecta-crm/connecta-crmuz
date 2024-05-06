import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatOriginInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);

  const handleChange = (field, value: string) => {
    dispatch(updateField({ field, value }));
  };
  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup city</div>
        <Input
          value={leadData.origin.state.name}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('origin.state.name', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="form-label required-label">Pickup state</div>
        <Input
          value={leadData.origin.state.code}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('origin.state.code', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between">
        <div className="form-label required-label">Pickup zip</div>
        <Input
          value={leadData.origin.zip}
          style={{ width: 200, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('origin.zip', e.target.value)}
        />
      </div>
    </>
  );
}

export default FeatOriginInner;
