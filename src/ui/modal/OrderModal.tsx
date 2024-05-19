// import { FormEvent } from 'react';
// import DownCollapse from '../form/DownCollapse';
// import FormControl from '../form/FormControl';
// import Input from '../form/Input';
// import InputCol from '../form/InputCol';
// import InputRow from '../form/InputRow';
// import Label from '../form/Label';
// import Select from '../form/Select';
// import UpCollapse from '../form/UpCollapse';
// import UseDatePicker from '../picker/DatePicker';
// import Modal from './Modal';
// export default function OrderModal() {
//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();

//     // const formData = new FormData(e.target);
//     // const formProps = Object.fromEntries(formData);
//     // console.log(formProps);
//   };

//   return (
//     <Modal isLoading title="New Order" onSubmit={onSubmit}>
//       <div className="modal__row">
//         <div className="modal__col">
//           <UpCollapse title="Details">
//             <DownCollapse title="Vehicle">
//               <InputRow>
//                 <InputCol>
//                   <Label>Vehicle year</Label>
//                 </InputCol>

//                 <InputCol>
//                   <UseDatePicker type="year" name="vehicle_year" />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Vehicle make</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="vehicle_make"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Vehicle model</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="vehicle_model"
//                   />
//                 </InputCol>
//               </InputRow>
//               {/* --------- */}

//               <div className="vehicle__details">
//                 <div className="vehicle__details__left">
//                   <Label>Lot</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="vehicle_lot"
//                   />
//                 </div>
//                 <div className="vehicle__details__right">
//                   <Label>VIN</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="vehicle_vin"
//                   />
//                 </div>
//               </div>

//               <div className="vehicle__details">
//                 <div className="vehicle__details__left">
//                   <Label>Color</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="vehicle_color"
//                   />
//                 </div>
//                 <div className="vehicle__details__right">
//                   <Label>Plate</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="vehicle_plate"
//                   />
//                 </div>
//               </div>

//               {/* <InputRow>
//                 <InputCol>

//                   <Input defaultValue="" type='text' placeholder='Empty' name='vehicle_model' />
//                 </InputCol>
//                 <InputCol>
//                   <Label>
//                     VIN
//                   </Label>
//                   <Input defaultValue="" type='text' placeholder='Empty' name='vehicle_model' />
//                 </InputCol>
//               </InputRow> */}

//               {/* <InputRow>
//                 <InputCol>
//                   <Label>
//                     Color
//                   </Label>
//                   <Input defaultValue="" type='text' placeholder='Empty' name='vehicle_model' />
//                 </InputCol>
//                 <InputCol>
//                   <Label>
//                     Plate
//                   </Label>
//                   <Input defaultValue="" type='text' placeholder='Empty' name='vehicle_model' />
//                 </InputCol>
//               </InputRow> */}

//               {/* ---------- */}
//             </DownCollapse>

//             <FormControl title="Condition">
//               <Select name="condition">
//                 <option className="disabled">Select</option>
//               </Select>
//             </FormControl>

//             <FormControl title="Type">
//               <Select name="type">
//                 <option className="disabled">Select</option>
//               </Select>
//             </FormControl>

//             <DownCollapse title="Pickup">
//               <InputRow>
//                 <InputCol>
//                   <Label>Pickup address</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_address"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Pickup city</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_city"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Pickup state</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_state"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Pickup zip</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_zip"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Business name</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_business_name"
//                   />
//                 </InputCol>
//               </InputRow>

//               <InputRow>
//                 <InputCol>
//                   <Label>Business phone</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_business_phone"
//                   />
//                 </InputCol>
//               </InputRow>

//               <InputRow>
//                 <InputCol>
//                   <Label>Contact person</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_contact_person"
//                   />
//                 </InputCol>
//               </InputRow>
//               <div className="phone__details">
//                 <div className="phone__details__left">
//                   <Label>Phone</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_phone__first"
//                   />
//                 </div>
//                 <div className="phone__details__right">
//                   <Label>Second</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_phone__second"
//                   />
//                 </div>
//               </div>
//               <InputRow>
//                 <InputCol>
//                   <Label>Buyer number</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="pickup_buyer_number"
//                   />
//                 </InputCol>
//               </InputRow>
//             </DownCollapse>

//             <DownCollapse title="Delivery">
//               <InputRow>
//                 <InputCol>
//                   <Label>Delivery address</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_address"
//                   />
//                 </InputCol>
//               </InputRow>

//               <InputRow>
//                 <InputCol>
//                   <Label>Delivery city</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_city"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Delivery state</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_state"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Delivery zip</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_zip"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Business name</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_business_name"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Business phone</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_business_phone"
//                   />
//                 </InputCol>
//               </InputRow>
//               <InputRow>
//                 <InputCol>
//                   <Label>Contact person</Label>
//                 </InputCol>

//                 <InputCol>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_contact_person*"
//                   />
//                 </InputCol>
//               </InputRow>

//               <div className="phone__details">
//                 <div className="phone__details__left">
//                   <Label>Phone</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_phone__first"
//                   />
//                 </div>
//                 <div className="phone__details__right">
//                   <Label>Second</Label>
//                   <Input
//                     defaultValue=""
//                     type="text"
//                     placeholder="Empty"
//                     name="delivery_phone__second"
//                   />
//                 </div>
//               </div>
//             </DownCollapse>

//             <FormControl title="Trailer type">
//               <Select name="trailer_type">
//                 <option className="disabled">Select</option>
//               </Select>
//             </FormControl>
//             <FormControl title="Est. Ship Date">
//               <UseDatePicker type={'date'} name="est_ship_date" />
//             </FormControl>
//             <FormControl title="Source">
//               <Select name="source">
//                 <option className="disabled">Select</option>
//               </Select>
//             </FormControl>

//             <div className="form__footer">
//               <Label>Cd note</Label>
//               <Input
//                 defaultValue=""
//                 type="text"
//                 placeholder="Empty"
//                 name="cd_note"
//               />
//             </div>
//             <div className="form__footer">
//               <Label>CM note</Label>
//               <Input
//                 defaultValue=""
//                 type="text"
//                 placeholder="Empty"
//                 name="cm_note"
//               />
//             </div>
//           </UpCollapse>
//         </div>
//         <div className="modal__col">
//           <UpCollapse title="Person">
//             <FormControl title="Name">
//               <Input
//                 defaultValue=""
//                 type="text"
//                 placeholder="Empty"
//                 name="person_name"
//               />
//             </FormControl>
//             <FormControl title="Email">
//               <Input
//                 defaultValue=""
//                 type="text"
//                 placeholder="Empty"
//                 name="person_email"
//               />
//             </FormControl>
//             <FormControl title="Phone">
//               <Input
//                 defaultValue=""
//                 type="number"
//                 placeholder="Empty"
//                 name="person_phone"
//               />
//             </FormControl>
//           </UpCollapse>
//         </div>
//       </div>
//     </Modal>
//   );
// }

import { Form, Input, Select, message } from 'antd';
import FormItem from 'antd/es/form/FormItem/index';
import { useEffect, useState } from 'react';
import { getUser } from '../../features/authentication/authSlice';
import Delivery from '../../features/destination/Delivery';
import { useCreateOrder } from '../../features/orders/useCreateOrder.ts';
import Pickup from '../../features/origin/Pickup';
import Source from '../../features/sourcecom/Source';
import VehicleContainer, {
  CarType,
} from '../../features/vehicle/VehicleContainer.tsx';
import { LeadDataType } from '../../models/index.ts';
import { useAppSelector } from '../../store/hooks';
import Modal from '../Modal.tsx';
import Person from '../Person.tsx';
import FormControl from '../form/FormControl.tsx';
import InputCol from '../form/InputCol.tsx';
import InputRow from '../form/InputRow.tsx';
import Label from '../form/Label.tsx';
import UpCollapse from '../form/UpCollapse.tsx';
import UseDatePicker from '../picker/DatePicker';
import { OrdersDataType } from './OrdersDataType.ts';
import dvigatel from '/img/drawer/dvigatel.svg';
import date from '/img/drawer/est-ship-date.svg';
import reservation from '/img/drawer/reservation.svg';
import total from '/img/drawer/total-tariff.svg';
import trailer from '/img/drawer/trailer.svg';
export default function OrdersModal({
  openLeadModal,
  setOpenLeadModa,
}: {
  openLeadModal: boolean;
  setOpenLeadModa: (a: boolean) => void;
}) {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [conditionValue, setConditionValue] = useState<string | null>(null);
  const [trailerType, setTrailerType] = useState<string | null>('');
  const [origin, setOrigin] = useState<string | null>('');
  const [delivery, setDelivery] = useState<string | null>('');
  const [source, setSource] = useState<string | null>('');
  const [personId, setPersonId] = useState<string | null>('');
  const [dateEstShip, setDateEstShip] = useState<string>('');
  const user = useAppSelector((item) => getUser(item));
  const { create, isLoading, isSuccess } = useCreateOrder();
  const createOrder = (e: OrdersDataType) => {
    console.log(e);
    const data: OrdersDataType = {
      vehicles: carData,
      status: 'quote',
      price: e.price,
      condition: conditionValue,
      trailerType: trailerType,
      notes: e.notes,
      reservationPrice: e.reservationPrice,
      dateEstShip: dateEstShip,
      customer: personId,
      source: source,
      origin: origin,
      destination: delivery,
      user: user?.id,
    };
    let errorText = '';
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === 'vehicles' && data[key].length === 0) {
          errorText += key + ' , ';
        }
        if (!data[key as keyof LeadDataType] && key !== 'notes') {
          errorText += key + ' , ';
        }
      }
    }

    if (errorText) {
      message.error(errorText + 'required ! ');
      return;
    }
    create(data);
  };
  useEffect(() => {
    if (!isLoading && isSuccess) {
      setOpenLeadModa(false);
    }
  }, [isLoading, isSuccess]);

  const [form] = Form.useForm();
  return (
    <Modal
      form={form}
      title="New order"
      width="middle"
      padding="0"
      loading={isLoading}
      open={openLeadModal}
      onCancel={() => {
        setOpenLeadModa(false);
      }}
    >
      <Form form={form} onFinish={createOrder}>
        <div className="modal__row">
          <div className="modal__col">
            <UpCollapse title="Details">
              <VehicleContainer setCarData={setCarData}>
                {
                  <>
                    <div className="vehicle__details">
                      <div className="vehicle__details__left">
                        <Label>Lot</Label>
                        <FormItem
                          name="lot"
                          style={{ margin: '0', minHeight: '0px' }}
                        >
                          <Input style={{ padding: '3px 5px' }} />
                        </FormItem>
                      </div>
                      <div className="vehicle__details__right">
                        <Label>VIN</Label>
                        <FormItem
                          name="min"
                          style={{ margin: '0', minHeight: '0px' }}
                        >
                          <Input style={{ padding: '3px 5px' }} />
                        </FormItem>
                      </div>
                    </div>

                    <div className="vehicle__details">
                      <div className="vehicle__details__left">
                        <Label>Color</Label>
                        <FormItem
                          name="color"
                          style={{ margin: '0', minHeight: '0px' }}
                        >
                          <Input style={{ padding: '3px 5px' }} />
                        </FormItem>
                      </div>
                      <div className="vehicle__details__right">
                        <Label>Plate</Label>
                        <FormItem
                          name="plate"
                          style={{ margin: '0', minHeight: '0px' }}
                        >
                          <Input style={{ padding: '3px 5px' }} />
                        </FormItem>
                      </div>
                    </div>
                  </>
                }
              </VehicleContainer>

              <FormControl title="Condition" img={dvigatel}>
                <Select
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
              <Pickup setPickup={setOrigin}>
                <InputRow>
                  <InputCol>
                    <Label>Business name</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="origin-name"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        placeholder="Business name"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
                <InputRow>
                  <InputCol>
                    <Label>Business phone</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="origin-phone"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        type="number"
                        placeholder="Business phone"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
                <InputRow>
                  <InputCol>
                    <Label>Contact person</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="origin-person"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        placeholder="Contact person"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>

                <div className="phone__details">
                  <div className="phone__details__left">
                    <Label>Phone</Label>
                    <FormItem
                      name="origin-phone-first"
                      style={{ margin: '0', minHeight: '0px' }}
                    >
                      <Input style={{ padding: '3px 5px' }} />
                    </FormItem>
                  </div>
                  <div className="phone__details__right">
                    <Label>Second</Label>
                    <FormItem
                      name="origin-phone-second"
                      style={{ margin: '0', minHeight: '0px' }}
                    >
                      <Input style={{ padding: '3px 5px' }} />
                    </FormItem>
                  </div>
                </div>

                <InputRow>
                  <InputCol>
                    <Label>Buyer number</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="origin-buyer"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        type="number"
                        placeholder="Buyer number"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
              </Pickup>
              <Delivery setDelivery={setDelivery}>
                <InputRow>
                  <InputCol>
                    <Label>Business name</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="destination-name"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        placeholder="Business name"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
                <InputRow>
                  <InputCol>
                    <Label>Business phone</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="destination-phone"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        type="number"
                        placeholder="Business phone"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
                <InputRow>
                  <InputCol>
                    <Label>Contact person</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="destination-person"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        placeholder="Contact person"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>

                <div className="phone__details">
                  <div className="phone__details__left">
                    <Label>Phone</Label>
                    <FormItem
                      name="destination-phone-first"
                      style={{ margin: '0', minHeight: '0px' }}
                    >
                      <Input style={{ padding: '3px 5px' }} />
                    </FormItem>
                  </div>
                  <div className="phone__details__right">
                    <Label>Second</Label>
                    <FormItem
                      name="destination-phone-second"
                      style={{ margin: '0', minHeight: '0px' }}
                    >
                      <Input style={{ padding: '3px 5px' }} />
                    </FormItem>
                  </div>
                </div>


                <InputRow>
                  <InputCol>
                    <Label>Buyer number</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="destination-buyer"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        type="number"
                        placeholder="Buyer number"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
              </Delivery>
              <FormControl title="Trailer type" img={trailer}>
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
              <FormControl title="Est. Ship Date" img={date}>
                <UseDatePicker
                  getYear={setDateEstShip}
                  type={'date'}
                  name="est_ship_date"
                />
              </FormControl>
              <Source setSource={setSource} />

              <FormControl title="Total tariff" img={total}>
                <FormItem name="price" style={{ margin: '0px', width: '100%' }}>
                  <Input placeholder="$0" type="number" />
                </FormItem>
              </FormControl>
              <FormControl title="Reservation" img={reservation}>
                <Form.Item
                  name="reservationPrice"
                  style={{ margin: '0px', width: '100%' }}
                >
                  <Input type="number" placeholder="$0" />
                </Form.Item>
              </FormControl>

              <div className="form__footer">
                <Form.Item
                  label="CM note"
                  name="notes"
                  style={{ width: '100%' }}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </UpCollapse>
          </div>
          <div className="modal__col">
            <Person setPersonId={setPersonId} />
          </div>
        </div>
      </Form>
    </Modal>
  );
}
