import { Select, message } from 'antd';
import { useState } from 'react';
import Person from '../../features/Person/Person';
import { getUser } from '../../features/authentication/authSlice';
import Delivery from '../../features/destination/Delivery';
import Pickup from '../../features/origin/Pickup';
import { useCreateQuote } from '../../features/quotes/useQuote';
import Source from '../../features/sourcecom/Source';
import VehicleContainer, {
  CarType,
} from '../../features/vehicle/vehicleContainer';
import { LeadDataType } from '../../models/LeadDataType';
import { QuoteDataType } from '../../models/QuoteDataType';
import { useAppSelector } from '../../store/hooks';
import UseDatePicker from '../DatePicker/DatePicker';
import FormControl from '../Form/FormControl';
import Input from '../Form/Input';
import Label from '../Form/Label';
import UpCollapse from '../Form/UpCollapse';
import Modal from './Modal';
import dvigatel from '/img/drawer/dvigatel.svg';
import date from '/img/drawer/est-ship-date.svg';
import reservation from '/img/drawer/reservation.svg';
import total from '/img/drawer/total-tariff.svg';
import trailer from '/img/drawer/trailer.svg';
export default function QuoteModal() {
  const [carData, setCarData] = useState<CarType[]>([]);
  const [conditionValue, setConditionValue] = useState<string | null>(null);
  const [trailerType, setTrailerType] = useState<string | null>('');
  const [origin, setOrigin] = useState<string | null>('');
  const [delivery, setDelivery] = useState<string | null>('');
  const [source, setSource] = useState<string | null>('');
  const [personId, setPersonId] = useState<string | null>('');
  const [dateEstShip, setDateEstShip] = useState<string>('');
  const user = useAppSelector((item) => getUser(item));
  const { create, isLoading } = useCreateQuote();
  const createLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const items = Object.fromEntries(new FormData(e.currentTarget));
    const data: QuoteDataType = {
      vehicles: carData,
      status: 'quote',
      price: items.paymentTotalTariff,
      condition: conditionValue,
      trailerType: trailerType,
      notes: items.cm_note,
      reservationPrice: items.paymentReservation,
      dateEstShip: dateEstShip,
      customer: personId,
      source: source,
      origin: origin,
      destination: delivery,
      // paymentTotalTariff:items.paymentTotalTariff,
      // paymentReservation:items.paymentReservation,
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
      message.error(errorText + 'required ! ');
      return;
    }
    create(data);
    console.log(data);
    
  };

  return (
    <Modal isLoading={isLoading} title="New quote" onSubmit={createLead}>
      <div className="modal__row">
        <div className="modal__col">
          <UpCollapse title="Details">
            <VehicleContainer setCarData={setCarData} />
            <FormControl title="Condition" img={dvigatel}>
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
              <Input
                type="number"
                placeholder="$0"
                name="paymentTotalTariff"
                defaultValue=""
              />
            </FormControl>
            <FormControl title="Reservation" img={reservation}>
              <Input
                type="number"
                placeholder="$0"
                name="paymentReservation"
                defaultValue=""
              />
            </FormControl>

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
