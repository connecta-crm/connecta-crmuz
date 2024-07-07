import { Form, Input, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { getUser } from '../../features/authentication/authSlice';
import Delivery from '../../features/destination/Delivery';
import { useCreateLead } from '../../features/leads/useLeadDetails';
import Pickup from '../../features/origin/Pickup';
import Source from '../../features/sourcecom/Source';

import VehicleContainer, {
  CarType,
} from '../../features/vehicle/VehicleContainer.tsx';
import { LeadDataType } from '../../models/LeadDataType.ts';
import { useAppSelector } from '../../store/hooks';
import { CONDITION_TYPES } from '../../utils/constants.ts';
import Modal from '../Modal.tsx';
import Person from '../Person.tsx';
import FormControl from '../form/FormControl.tsx';
import UpCollapse from '../form/UpCollapse.tsx';
import UseDatePicker from '../picker/DatePicker.tsx';
import dvigatel from '/img/drawer/dvigatel.svg';
import date from '/img/drawer/est-ship-date.svg';
import trailer from '/img/drawer/trailer.svg';

export default function LeadModal({
  openLeadModal,
  setOpenLeadModa,
}: {
  openLeadModal: boolean;
  setOpenLeadModa: (a: boolean) => void;
}) {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [conditionValue, setConditionValue] = useState<string | null>(null);
  const [trailerType, setTrailerType] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string | null>('');
  const [delivery, setDelivery] = useState<string | null>('');
  const [source, setSource] = useState<string | null>(null);
  const [personId, setPersonId] = useState<string | null>('');
  const [dateEstShip, setDateEstShip] = useState<string>('');
  const user = useAppSelector((item) => getUser(item));
  const { create, isLoading, isSuccess } = useCreateLead();
  const createLead = (e: LeadDataType) => {
    console.log(e);
    const data: LeadDataType = {
      vehicles: carData,
      status: 'leads',
      price: 2147483647,
      condition: conditionValue,
      trailerType: trailerType,
      notes: e.notes,
      reservationPrice: 2147483647,
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
      title="New lead"
      width="middle"
      padding="0"
      loading={isLoading}
      open={openLeadModal}
      onCancel={() => {
        setOpenLeadModa(false);
      }}
    >
      <Form form={form} onFinish={createLead}>
        <div className="modal__row">
          <div className="modal__col">
            <UpCollapse title="Details">
              <VehicleContainer setCarData={setCarData} />
              <FormControl title="Condition" img={dvigatel}>
                <Select
                  style={{ width: '100%' }}
                  onChange={(a) => setConditionValue(a)}
                  placeholder="Select a condition"
                  options={CONDITION_TYPES}
                />
              </FormControl>
              <Pickup setPickup={setOrigin} />
              <Delivery setDelivery={setDelivery} />
              <FormControl title="Trailer type" img={trailer}>
                <Select
                  style={{ width: '100%' }}
                  onChange={(a) => setTrailerType(a)}
                  placeholder="Select type"
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

              <div className="form__footer">
                <Form.Item
                  label="CM note"
                  name="notes"
                  style={{ width: '100%' }}
                  preserve={false}
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
