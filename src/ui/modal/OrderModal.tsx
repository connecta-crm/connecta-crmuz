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
import { OrdersDataType } from '../../models/OrdersDataType.ts';
import { useAppSelector } from '../../store/hooks';
import { CONDITION_TYPES } from '../../utils/constants.ts';
import Modal from '../Modal.tsx';
import Person from '../Person.tsx';
import FormControl from '../form/FormControl.tsx';
import InputCol from '../form/InputCol.tsx';
import InputRow from '../form/InputRow.tsx';
import Label from '../form/Label.tsx';
import UpCollapse from '../form/UpCollapse.tsx';
import UseDatePicker from '../picker/DatePicker';
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
  const [dateEstPu, setDateEstPu] = useState<string>('');
  const [dateEstDel, setDateEstDel] = useState<string>('');
  const user = useAppSelector((item) => getUser(item));
  const { create, isLoading, isSuccess } = useCreateOrder();
  const createOrder = (e: OrdersDataType) => {
    console.log(e);
    const data: OrdersDataType = {
      vehicles: carData,
      status: 'orders',
      condition: conditionValue,
      trailerType: trailerType,
      dateEstShip: dateEstShip,
      dateEstPu: dateEstPu,
      dateEstDel: dateEstDel,
      customer: personId,
      source: source,
      origin: origin,
      destination: delivery,
      buyerNumber: e.buyerNumber,
      originBusinessName: e.originBusinessName,
      originBusinessPhone: e.originBusinessPhone,
      originContactPerson: e.originContactPerson,
      originPhone: e.originPhone,
      originSecondPhone: e.originSecondPhone,
      originBuyerNumber: e.originBuyerNumber,
      originAddress: e.originAddress,
      destinationBusinessName: e.destinationBusinessName,
      destinationBusinessPhone: e.destinationBusinessPhone,
      destinationContactPerson: e.destinationContactPerson,
      destinationPhone: e.destinationPhone,
      destinationSecondPhone: e.destinationSecondPhone,
      destinationAddress: e.destinationAddress,
      paymentTotalTariff: e.paymentTotalTariff,
      paymentReservation: e.paymentReservation,
      paymentCarrierPay: e.paymentCarrierPay,
      locationType: e.locationType,
      cdNote: e.cdNote,
      cmNote: e.cmNote,
      user: user?.id,
      // price: null,
      // notes: undefined,
      // reservationPrice: '',
      // paymentPaidReservation: 0,
      // paymentCodToCarrier: 0,
      // paymentPaidToCarrier: 0,
      // dateDispatched: null,
      // datePickedUp: null,
      // dateDelivered: null,
      // extraUser: null
    };
    let errorText = '';
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (key === 'vehicles' && data[key].length === 0) {
          errorText += key + ' , ';
        }
        if (!data[key as keyof OrdersDataType] && key !== 'notes') {
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
              <VehicleContainer type={true} setCarData={setCarData} />

              <FormControl title="Condition" img={dvigatel}>
                <Select
                  style={{ width: '100%' }}
                  onChange={(a) => setConditionValue(a)}
                  placeholder="Select a condition"
                  options={CONDITION_TYPES}
                />
              </FormControl>
              <Pickup setPickup={setOrigin}>
                <InputRow>
                  <InputCol>
                    <Label>Pickup address</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="originAddress"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        placeholder="Pickup address"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>

                <InputRow>
                  <InputCol>
                    <Label>Business name</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="originBusinessName"
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
                      name="originBusinessPhone"
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
                      name="originContactPerson"
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
                      name="originPhone"
                      style={{ margin: '0', minHeight: '0px' }}
                    >
                      <Input style={{ padding: '3px 5px' }} />
                    </FormItem>
                  </div>
                  <div className="phone__details__right">
                    <Label>Second</Label>
                    <FormItem
                      name="originSecondPhone"
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
                      name="originBuyerNumber"
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
                    <Label>Delivery address</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="destinationAddress"
                      style={{ margin: '0', width: '100%', minHeight: '0' }}
                    >
                      <Input
                        placeholder="Pickup address"
                        style={{ padding: '3px 5px' }}
                      />
                    </FormItem>
                  </InputCol>
                </InputRow>
                <InputRow>
                  <InputCol>
                    <Label>Business name</Label>
                  </InputCol>
                  <InputCol>
                    <FormItem
                      name="destinationBusinessName"
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
                      name="destinationBusinessPhone"
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
                      name="destinationContactPerson"
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
                      name="destinationPhone"
                      style={{ margin: '0', minHeight: '0px' }}
                    >
                      <Input style={{ padding: '3px 5px' }} />
                    </FormItem>
                  </div>
                  <div className="phone__details__right">
                    <Label>Second</Label>
                    <FormItem
                      name="destinationSecondPhone"
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
                      name="buyerNumber"
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
              <FormControl title="Location type">
                <FormItem
                  className="m-0 w-100"
                  name="locationType"
                  // rules={[{ required: true, message: '' }]}
                >
                  <Select
                    options={[
                      { value: 'r2r', label: 'Residential to residential' },
                      { value: 'r2b', label: 'Residential to business' },
                      { value: 'b2r', label: 'Business to residential' },
                      { value: 'b2b', label: 'Business to business' },
                    ]}
                  />
                </FormItem>
              </FormControl>
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
              <Source setSource={setSource} />
              <div className="form__footer">
                <Form.Item
                  label="CD note"
                  name="cdNote"
                  style={{ width: '100%', margin: '0' }}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </div>
              <div className="form__footer">
                <Form.Item
                  label="CM note"
                  name="cmNote"
                  style={{ width: '100%' }}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              </div>
            </UpCollapse>
          </div>
          <div className="modal__col">
            <Person setPersonId={setPersonId} />
            <br />
            <UpCollapse hasButton={true} title="Date">
              <FormControl title="Est. Ship Date" img={date}>
                <UseDatePicker
                  getYear={setDateEstShip}
                  type={'date'}
                  name="dateEstShip"
                />
              </FormControl>
              <FormControl title="Est. PU Date" img={date}>
                <UseDatePicker
                  getYear={setDateEstPu}
                  type={'date'}
                  name="dateEstPu"
                />
              </FormControl>
              <FormControl title="Est. DEL Date" img={date}>
                <UseDatePicker
                  getYear={setDateEstDel}
                  type={'date'}
                  name="dateEstDel"
                />
              </FormControl>
            </UpCollapse>
            <br />
            <UpCollapse title="Payment">
              <FormControl title="Total tariff" img={total}>
                <FormItem
                  name="paymentTotalTariff"
                  style={{ margin: '0px', width: '100%', minHeight: '0' }}
                >
                  <Input
                    placeholder="$0"
                    type="number"
                    style={{ padding: '5px 4px' }}
                  />
                </FormItem>
              </FormControl>
              <FormControl title="Reservation" img={reservation}>
                <Form.Item
                  name="paymentReservation"
                  style={{ margin: '0px', width: '100%', minHeight: '0' }}
                >
                  <Input
                    type="number"
                    placeholder="$0"
                    style={{ padding: '5px 4px' }}
                  />
                </Form.Item>
              </FormControl>
              <FormControl title="Carrier pay" img={reservation}>
                <Form.Item
                  name="paymentCarrierPay"
                  style={{ margin: '0px', width: '100%', minHeight: '0' }}
                >
                  <Input
                    type="number"
                    placeholder="$0"
                    style={{ padding: '5px 4px' }}
                  />
                </Form.Item>
              </FormControl>
            </UpCollapse>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
