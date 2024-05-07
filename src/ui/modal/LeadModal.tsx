import { Select } from 'antd';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Person from '../../features/Person/Person';
import { getUser } from '../../features/authentication/authSlice';
import Delivery from '../../features/delivery/Delivery';
import { useCreateLead } from '../../features/leads/useLeadDetails';
import Pickup from '../../features/pickup/Pickup';
import Source from '../../features/sourcecom/Source';
import VehicleContainer, {
  CarType,
} from '../../features/vehicle/vehicleContainer';
import { LeadDataType } from '../../models/LeadDataType';
import { useAppSelector } from '../../store/hooks';
import UseDatePicker from '../DatePicker/DatePicker';
import FormControl from '../Form/FormControl';
import Input from '../Form/Input';
import Label from '../Form/Label';
import UpCollapse from '../Form/UpCollapse';
import Modal from './Modal';
export default function LeadModal() {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [conditionValue, setConditionValue] = useState<string | null>(null);
  const [trailerType, setTrailerType] = useState<string | null>('');
  const [origin, setOrigin] = useState<string | null>('');
  const [delivery, setDelivery] = useState<string | null>('');
  const [source, setSource] = useState<string | null>('');
  const [personId, setPersonId] = useState<string | null>('');
  const [dateEstShip, setDateEstShip] = useState<string>('');
  const user = useAppSelector((item) => getUser(item));
  const { create, isLoading } = useCreateLead();
  const createLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = Object.fromEntries(new FormData(e.currentTarget));
    const data: LeadDataType = {
      vehicles: carData,
      status: 'leads',
      price: 2147483647,
      condition: conditionValue,
      trailerType: trailerType,
      notes: items.cm_note,
      reservationPrice: 2147483647,
      dateEstShip: dateEstShip,
      customer: personId,
      source: source,
      origin: origin,
      destination: delivery,
      user: user?.id,
      // extraUser: 0,
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
      console.log(data);
      toast.error(errorText + 'required ! ');
      return;
    }
    create(data);
  };

  return (
    <Modal isLoading={isLoading} title="New Lead" onSubmit={createLead}>
      <div className="modal__row">
        <div className="modal__col">
          <UpCollapse title="Details">
            <VehicleContainer setCarData={setCarData} />
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
            <Pickup setPickup={setOrigin} />
            <Delivery setDelivery={setDelivery} />
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
              <UseDatePicker
                getYear={setDateEstShip}
                type={'date'}
                name="est_ship_date"
              />
            </FormControl>
            <Source setSource={setSource} />

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
          <Person setPersonId={setPersonId} />
        </div>
      </div>
    </Modal>
  );
}
