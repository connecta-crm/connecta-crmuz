import { Select } from 'antd';
import { useState } from 'react';
import Person from '../../features/Person/Person';
import Delivery from '../../features/delivery/Delivery';
import Pickup from '../../features/pickup/Pickup';
import Source from '../../features/sourcecom/Source';
import Vehicle from '../../features/vehicle/Vehicle';
import UseDatePicker from '../DatePicker/DatePicker';
import FormControl from '../Form/FormControl';
import Input from '../Form/Input';
import Label from '../Form/Label';
import UpCollapse from '../Form/UpCollapse';
import Modal from './Modal';
export default function LeadModal() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [conditionValue, setConditionValue] = useState<string | null>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [trailerType, setTrailerType] = useState<string | null>('');
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [cityValue, setCityValue] = useState(null);

  //   useEffect(()=>{
  // console.log(cityValue);

  //   },[cityValue])

  const [searchCity, setSearchCity] = useState('');

  const citys = useCity(searchCity);

  return (
    <Modal title="New Lead" onSubmit={() => console.log('Lead')}>
      <div className="modal__row">
        <div className="modal__col">
          <UpCollapse title="Details">
            <Vehicle />
            <FormControl title="Condition">
              <Select
                defaultValue=""
                style={{ width: '100%' }}
                onChange={(a) => setConditionValue(a)}
                placeholder="Select a condition"
                options={[
                  { value: 'run', label: 'Run and drives' },
                  { value: 'rols', label: 'Inop, it rolls' },
                  { value: 'forklift', label: 'forklift' },
                ]}
              />
            </FormControl>
            <Pickup />
            <Delivery />
            <FormControl title="Trailer type">
              <Select
                defaultValue=""
                style={{ width: '100%' }}
                onChange={(a) => setTrailerType(a)}
                options={[
                  { value: 'open', label: 'Open' },
                  { value: 'enclosed', label: 'Enclosed' },
                ]}
              />
            </FormControl>
            <FormControl title="Est. Ship Date">
              <UseDatePicker type={'date'} name="est_ship_date" />
            </FormControl>
            <Source />

            <div className="form__footer">
              <Label>CM note</Label>
              <Input
                type="text"
                placeholder="Empty"
                name="cm_note"
                defaultValue=""
              />
            </div>
          </UpCollapse>
        </div>
        <div className="modal__col">
          <Person />
        </div>
      </div>
    </Modal>
  );
}
