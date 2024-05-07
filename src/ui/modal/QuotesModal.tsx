import Modal from './Modal';
// import { useModal } from '../../context/Modal';
import { FormEvent } from 'react';
import UseDatePicker from '../DatePicker/DatePicker';
import DownCollapse from '../Form/DownCollapse';
import FormControl from '../Form/FormControl';
import Input from '../Form/Input';
import InputCol from '../Form/InputCol';
import InputRow from '../Form/InputRow';
import Label from '../Form/Label';
import Select from '../Form/Select';
import UpCollapse from '../Form/UpCollapse';

export default function QuotesModal() {
  // const { hideModal } = useModal()

  const getFotmData = (e: FormEvent) => {
    e.preventDefault();

    // const formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData);
    // console.log(formProps);
  };

  return (
    <Modal isLoading title="New Quates" onSubmit={getFotmData}>
      <div className="modal__row">
        <div className="modal__col">
          <UpCollapse title="Details">
            <DownCollapse title="Vehicle">
              <InputRow>
                <InputCol>
                  <Label>Vehicle year</Label>
                </InputCol>

                <InputCol>
                  <UseDatePicker type="year" name="vehicle_year" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Vehicle make</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue="" type="text" placeholder="Empty" name="vehicle_make" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Vehicle model</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue="" type="text" placeholder="Empty" name="vehicle_model" />
                </InputCol>
              </InputRow>
            </DownCollapse>

            <FormControl title="Condition">
              <Select name="condition">
                <option className="disabled">Select</option>
              </Select>
            </FormControl>

            <FormControl title="Type">
              <Select name="type">
                <option className="disabled">Select</option>
              </Select>
            </FormControl>

            <DownCollapse title="Pickup">
              <InputRow>
                <InputCol>
                  <Label>Pickup city</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue="" type="text" placeholder="Empty" name="pickup_city" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Pickup state</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue="" type="text" placeholder="Empty" name="pickup_state" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Pickup zip</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue="" type="text" placeholder="Empty" name="pickup_zip" />
                </InputCol>
              </InputRow>
            </DownCollapse>

            <DownCollapse title="Delivery">
              <InputRow>
                <InputCol>
                  <Label>Delivery city</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue="" type="text" placeholder="Empty" name="delivery_city" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Delivery state</Label>
                </InputCol>

                <InputCol>
                  <Input defaultValue=""
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
                  <Input defaultValue="" type="text" placeholder="Empty" name="delivery_zip" />
                </InputCol>
              </InputRow>
            </DownCollapse>

            <FormControl title="Trailer type">
              <Select name="trailer_type">
                <option className="disabled">Select</option>
              </Select>
            </FormControl>
            <FormControl title="Est. Ship Date">
              <UseDatePicker type={'date'} name="est_ship_date" />
            </FormControl>
            <FormControl title="Source">
              <Select name="source">
                <option className="disabled">Select</option>
              </Select>
            </FormControl>

            <div className="form__footer">
              <Label>CM note</Label>
              <Input defaultValue="" type="text" placeholder="Empty" name="cm_note" />
            </div>
          </UpCollapse>
        </div>
        <div className="modal__col">
          <UpCollapse title="Person">
            <FormControl title="Name">
              <Input defaultValue="" type="text" placeholder="Empty" name="person_name" />
            </FormControl>
            <FormControl title="Email">
              <Input defaultValue="" type="text" placeholder="Empty" name="person_email" />
            </FormControl>
            <FormControl title="Phone">
              <Input defaultValue="" type="number" placeholder="Empty" name="person_phone" />
            </FormControl>
          </UpCollapse>
        </div>
      </div>
    </Modal>
  );
}
