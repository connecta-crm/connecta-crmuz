import { Select } from 'antd';
import { useState } from 'react';
import Person from '../../features/Person/Person';
import { useCity } from '../../features/leads/useLeadDetails';
import Source from '../../features/sourcecom/Source';
import Vehicle from '../../features/vehicle/Vehicle';
import UseDatePicker from '../DatePicker/DatePicker';
import DownCollapse from '../Form/DownCollapse';
import FormControl from '../Form/FormControl';
import Input from '../Form/Input';
import InputCol from '../Form/InputCol';
import InputRow from '../Form/InputRow';
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
            <DownCollapse title="Pickup">
              <InputRow>
                <InputCol>
                  <Label>Pickup city</Label>
                </InputCol>
                <InputCol>
                  <Select
                    showSearch
                    // value={makeValue ? makeValue : null}
                    optionFilterProp="children"
                    placeholder={'Search  make'}
                    style={{ width: '100%' }}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onSearch={(value) => setSearchCity(value)}
                    // onChange={(data, record) => handleSelectMake(data, record)}
                    options={(citys || []).map(
                      (d: { id: number; name: string }) => ({
                        value: d.id,
                        label: d.name,
                      }),
                    )}
                  />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Pickup state</Label>
                </InputCol>

                <InputCol>
                  <Input type="text" placeholder="Empty" name="pickup_state" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Pickup zip</Label>
                </InputCol>

                <InputCol>
                  <Select
                    showSearch
                    // value={makeValue ? makeValue : null}
                    optionFilterProp="children"
                    placeholder={'Search  make'}
                    style={{ width: '100%' }}
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onSearch={(value) => setSearchCity(value)}
                    onChange={(data) => setCityValue(data)}
                    options={(citys || []).map(
                      (d: { id: number; zip: string }) => ({
                        value: d.id,
                        label: d.zip,
                      }),
                    )}
                  />
                </InputCol>
              </InputRow>
            </DownCollapse>
            <DownCollapse title="Delivery">
              <InputRow>
                <InputCol>
                  <Label>Delivery city</Label>
                </InputCol>
                <InputCol>
                  <Input type="text" placeholder="Empty" name="delivery_city" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Delivery state</Label>
                </InputCol>

                <InputCol>
                  <Input
                    type="text"
                    placeholder="Empty"
                    name="delivery_state"
                  />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Delivery zip</Label>
                </InputCol>

                <InputCol>
                  <Input type="text" placeholder="Empty" name="delivery_zip" />
                </InputCol>
              </InputRow>
            </DownCollapse>

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
              <Input type="text" placeholder="Empty" name="cm_note" />
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
