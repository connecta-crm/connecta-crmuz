import Modal from './Modal'
import UpCollapse from '../Form/UpCollapse';
import DownCollapse from '../Form/DownCollapse';
import FormControl from '../Form/FormControl';
import InputRow from '../Form/InputRow';
import Label from '../Form/Label';
import Input from '../Form/Input';
import InputCol from '../Form/InputCol';
import Select from '../Form/Select';
import UseDatePicker from '../DatePicker/DatePicker';
import { FormEvent } from 'react';
export default function OrderModal() {

  const onSubmit = (e:FormEvent) => {
    e.preventDefault();

    // const formData = new FormData(e.target);
    // const formProps = Object.fromEntries(formData);
    // console.log(formProps);
  }

  return (


    <Modal title='New Order' onSubmit={onSubmit}>
      <div className='modal__row'>
        <div className='modal__col'>
          <UpCollapse title="Details">
            <DownCollapse title='Vehicle'>
              <InputRow>
                <InputCol>
                  <Label>
                    Vehicle year
                  </Label>
                </InputCol>

                <InputCol>
                  <UseDatePicker type='year' name='vehicle_year' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Vehicle make
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='vehicle_make' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Vehicle model
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='vehicle_model' />
                </InputCol>
              </InputRow>
              {/* --------- */}

              <div className='vehicle__details'>
                <div className='vehicle__details__left'>
                    <Label>Lot</Label>
                    <Input type='text' placeholder='Empty' name='vehicle_lot' />
                </div>
                <div className='vehicle__details__right'>
                    <Label>VIN</Label>
                    <Input type='text' placeholder='Empty' name='vehicle_vin' />
                </div>
              </div>

              <div className='vehicle__details'>
                <div className='vehicle__details__left'>
                    <Label>Color</Label>
                    <Input type='text' placeholder='Empty' name='vehicle_color' />
                </div>
                <div className='vehicle__details__right'>
                    <Label>Plate</Label>
                    <Input type='text' placeholder='Empty' name='vehicle_plate' />
                </div>
              </div>


              {/* <InputRow>
                <InputCol>
                 
                  <Input type='text' placeholder='Empty' name='vehicle_model' />
                </InputCol>
                <InputCol>
                  <Label>
                    VIN
                  </Label>
                  <Input type='text' placeholder='Empty' name='vehicle_model' />
                </InputCol>
              </InputRow> */}

              {/* <InputRow>
                <InputCol>
                  <Label>
                    Color
                  </Label>
                  <Input type='text' placeholder='Empty' name='vehicle_model' />
                </InputCol>
                <InputCol>
                  <Label>
                    Plate
                  </Label>
                  <Input type='text' placeholder='Empty' name='vehicle_model' />
                </InputCol>
              </InputRow> */}

              {/* ---------- */}

            </DownCollapse>

            <FormControl title="Condition">
              <Select name='condition'>
                <option className='disabled'>Select</option>
              </Select>
            </FormControl>

            <FormControl title="Type">
              <Select name='type'>
                <option className='disabled'>Select</option>
              </Select>
            </FormControl>

            <DownCollapse title='Pickup'>
              <InputRow>
                <InputCol>
                  <Label>
                    Pickup address
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_address' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Pickup city
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_city' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Pickup state
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_state' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Pickup zip
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_zip' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Business name
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_business_name' />
                </InputCol>
              </InputRow>

              <InputRow>
                <InputCol>
                  <Label>
                    Business phone
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_business_phone' />
                </InputCol>
              </InputRow>

              <InputRow>
                <InputCol>
                  <Label>
                    Contact person
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_contact_person' />
                </InputCol>
              </InputRow>
              <div className='phone__details'>
                <div className='phone__details__left'>
                  <Label>Phone</Label>
                  <Input type='text' placeholder='Empty' name='pickup_phone__first'/>
                </div>
                <div className='phone__details__right'>
                  <Label>Second</Label>
                  <Input type='text' placeholder='Empty' name='pickup_phone__second'/>
                </div>
              </div>
              <InputRow>
                <InputCol>
                  <Label>
                    Buyer number
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='pickup_buyer_number' />
                </InputCol>
              </InputRow>



            </DownCollapse>

            <DownCollapse title='Delivery'>
              <InputRow>
                <InputCol>
                  <Label>
                    Delivery address
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='delivery_address' />
                </InputCol>
              </InputRow>

              <InputRow>
                <InputCol>
                  <Label>
                    Delivery city
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='delivery_city' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Delivery state
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name='delivery_state' />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Delivery zip
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name="delivery_zip" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Business name
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name="delivery_business_name" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Business phone
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name="delivery_business_phone" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>
                    Contact person
                  </Label>
                </InputCol>

                <InputCol>
                  <Input type='text' placeholder='Empty' name="delivery_contact_person*" />
                </InputCol>
              </InputRow>

              <div className='phone__details'>
                <div className='phone__details__left'>
                  <Label>Phone</Label>
                  <Input type='text' placeholder='Empty' name='delivery_phone__first'/>
                </div>
                <div className='phone__details__right'>
                  <Label>Second</Label>
                  <Input type='text' placeholder='Empty' name='delivery_phone__second'/>
                </div>
              </div>

                

            </DownCollapse>


            <FormControl title="Trailer type">
              <Select name='trailer_type'>
                <option className='disabled'>Select</option>
              </Select>
            </FormControl>
            <FormControl title="Est. Ship Date">
              <UseDatePicker type={"date"} name='est_ship_date' />
            </FormControl>
            <FormControl title="Source">
              <Select name='source'>
                <option className='disabled'>Select</option>
              </Select>
            </FormControl>

            <div className='form__footer'>
              <Label>
                Cd note
              </Label>
              <Input type='text' placeholder='Empty' name='cd_note' />
            </div>
            <div className='form__footer'>
              <Label>
                CM note
              </Label>
              <Input type='text' placeholder='Empty' name='cm_note' />
            </div>

          </UpCollapse>
        </div>
        <div className='modal__col'>
          <UpCollapse title="Person">
            <FormControl title="Name">
              <Input type='text' placeholder='Empty' name='person_name' />
            </FormControl>
            <FormControl title="Email">
              <Input type='text' placeholder='Empty' name='person_email' />
            </FormControl>
            <FormControl title="Phone">
              <Input type='number' placeholder='Empty' name='person_phone' />
            </FormControl>
          </UpCollapse>

        </div>
      </div>
    </Modal>
  )
}
