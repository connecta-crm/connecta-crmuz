import { Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getLeadData, updateField } from '../../leads/leadSlice';

function FeatOriginInner() {
  const dispatch = useAppDispatch();
  const leadData = useAppSelector(getLeadData);
  //   {
  //     "id": 371,
  //     "state": {
  //         "id": 6,
  //         "name": "California",
  //         "code": "CA"
  //     },
  //     "name": "Eureka",
  //     "zip": "95501",
  //     "text": null,
  //     "long": -124.15668495735295,
  //     "lat": 40.79577976495098
  // }

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
