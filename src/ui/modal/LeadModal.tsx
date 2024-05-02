import { Select } from 'antd';
import Modal from './Modal';
// import { useModal } from '../../context/Modal';
import { FormEvent, useEffect, useState } from 'react';
import {
  useLeadsCity,
  useLeadsMake,
  useLeadsModel,
  useLeadsPerson,
  useLeadsSource,
} from '../../features/leads/useLeadDetails';
import Leads from '../../services/leads';
import UseDatePicker from '../DatePicker/DatePicker';
import DownCollapse from '../Form/DownCollapse';
import FormControl from '../Form/FormControl';
import Input from '../Form/Input';
import InputCol from '../Form/InputCol';
import InputRow from '../Form/InputRow';
import Label from '../Form/Label';
import UpCollapse from '../Form/UpCollapse';
import SearchSelect from './SearchSelect';
export default function LeadModal() {
  const [selectPersonValue, setSelectPersonValue] = useState({});
  const [vehicleValue, setVehicleValue] = useState<number | null>(null);
  const [conditionValue, setConditionValue] = useState<string | null>(null);
  const [originValue, setOriginValue] = useState<string | null>(null);
  const [destinationValue, setdDestinationValue] = useState<string | null>('');
  const [trailerType, setTrailerType] = useState<string | null>('');
  const [source, setSource] = useState<string | null>('');
  const [customer, setCustomer] = useState<string | null>('');

  const [person, setPerson] = useState({ name: '', phone: '', email: '' });
  const [url, seturl] = useState('');
  useEffect(() => {
    // const url = "";
    const searchParam = new URLSearchParams(person);
    seturl(searchParam.toString());
  }, [person]);

  const getFormData = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    const leadAllData = {
      vehicles: [
        {
          vehicle: vehicleValue,
          vehicleYear: formProps?.vehicleYear,
        },
      ],
      status: 'leads',
      price: 2147483647,
      condition: conditionValue,
      trailerType: trailerType,
      notes: formProps?.notes,
      reservationPrice: 2147483647,
      dateEstShip: formProps?.dateEstShip,
      customer: customer,
      source: source,
      origin: originValue,
      destination: destinationValue,
    };
    Leads.createLead(leadAllData)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
    console.log(leadAllData);
  };

  const personData = useLeadsPerson(url);
  const [vhicle, setVhicle] = useState('');
  const [zip, setZep] = useState('');
  const [state, setState] = useState('');

  const [deliveryZip, setDeliveryZip] = useState('');
  const [deliveryState, setDeliveryState] = useState('');

  const [searchValue, setSearchValue] = useState('');
  const [searchModelValue, setSearchModelValue] = useState<string | undefined>(
    '',
  );
  const [modelId, setModelId] = useState<number | null>(1);
  const [cityValue, setCityValue] = useState<string | null>('');
  const [deliveryValue, setDeliveryValue] = useState<string | null>('');

  // ================all query============
  const makes = useLeadsMake(searchValue);
  const model = useLeadsModel(modelId, searchModelValue);
  const citys = useLeadsCity(cityValue);
  const deliverys = useLeadsCity(deliveryValue);
  const sources = useLeadsSource();

  // =========MAKE ACTIONS======
  const handleSearchMake = (newValue: string) => {
    setSearchValue(newValue);
  };
  const handleChangeMake = (newValue: number) => {
    setModelId(newValue);
  };
  // =========MODEL ACTIONS======

  const handleSearchModel = (newValue: string) => {
    setSearchModelValue(newValue);
    console.log(newValue);
  };
  const handleChangeModel = (newValue: number) => {
    setVehicleValue(newValue);

    if (newValue) {
      model.map((item) => {
        if (item.id == newValue) {
          setVhicle(item.vehicleType);
        }
      });
    }
  };

  // =========CITY ACTIONS======

  const handleSearchCity = (newValue: string) => {
    setCityValue(newValue);
  };

  const handleChangeCity = (newValue: string) => {
    setOriginValue(newValue);
    citys.map((item) => {
      if (item.id == newValue) {
        setZep(item?.zip);
        setState(item?.state?.name);
      }
    });
  };

  // =========Deliverys ACTIONS======

  const handleSearchDeliverys = (newValue: string) => {
    setDeliveryValue(newValue);
  };

  const handleChangeDelivery = (newValue: string) => {
    setdDestinationValue(newValue);
    citys.map((item) => {
      if (item?.id == newValue) {
        setDeliveryZip(item.zip);
        setDeliveryState(item?.state?.name);
      }
    });
  };

  // ==========Person==========

  const handleSearchPersonName = (newValue: string) => {
    setSelectPersonValue({});
    setPerson({ ...person, name: newValue });
  };
  const handleSearchPersonEmail = (newValue: string) => {
    setSelectPersonValue({});
    setPerson({ ...person, email: newValue });
  };
  const handleSearchPersonPhone = (newValue: string) => {
    setSelectPersonValue({});
    setPerson({ ...person, phone: newValue });
  };

  const handleChangePerson = (newValue: string, record) => {
    setSelectPersonValue(record.all);
    setCustomer(newValue);
  };

  return (
    <Modal title="New Lead" onSubmit={getFormData}>
      <div className="modal__row">
        <div className="modal__col">
          <UpCollapse title="Details">
            <DownCollapse title="Vehicle">
              <InputRow>
                <InputCol>
                  <Label>Vehicle year</Label>
                </InputCol>

                <InputCol>
                  <UseDatePicker type="year" name="vehicleYear" />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Vehicle make</Label>
                </InputCol>

                <InputCol>
                  <SearchSelect
                    items={makes}
                    handleSearch={handleSearchMake}
                    handleChange={handleChangeMake}
                  />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Vehicle model</Label>
                </InputCol>

                <InputCol>
                  <SearchSelect
                    items={model}
                    handleSearch={handleSearchModel}
                    handleChange={handleChangeModel}
                  />
                </InputCol>
              </InputRow>

              <InputRow>
                <InputCol>
                  <Label>Vehicle type</Label>
                </InputCol>
                <InputCol>
                  <Input
                    defaultValue={vhicle}
                    name="vehicl_type"
                    type="text"
                    placeholder="Vehicle type"
                  />
                </InputCol>
              </InputRow>

              <FormControl title="Condition">
                <Select
                  defaultValue=""
                  style={{ width: '100%' }}
                  onChange={(a) => setConditionValue(a)}
                  options={[
                    { value: 'run', label: 'Run and drives' },
                    { value: 'rols', label: 'Inop, it rolls' },
                    { value: 'forklift', label: 'forklift' },
                  ]}
                />
              </FormControl>
            </DownCollapse>

            <DownCollapse title="Pickup">
              <InputRow>
                <InputCol>
                  <Label>Pickup city</Label>
                </InputCol>

                <InputCol>
                  <SearchSelect
                    items={citys}
                    handleSearch={handleSearchCity}
                    handleChange={handleChangeCity}
                  />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Pickup state</Label>
                </InputCol>

                <InputCol>
                  <Input
                    type="text"
                    placeholder="Empty"
                    name="pickup_state"
                    defaultValue={state}
                  />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Pickup zip</Label>
                </InputCol>

                <InputCol>
                  <Input
                    type="text"
                    placeholder="Empty"
                    name="pickup_zip"
                    defaultValue={zip}
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
                  <SearchSelect
                    items={deliverys}
                    handleSearch={handleSearchDeliverys}
                    handleChange={handleChangeDelivery}
                  />
                </InputCol>
              </InputRow>
              <InputRow>
                <InputCol>
                  <Label>Delivery state</Label>
                </InputCol>

                <InputCol>
                  <Input
                    defaultValue={deliveryState}
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
                  <Input
                    type="text"
                    placeholder="Empty"
                    name="delivery_zip"
                    defaultValue={deliveryZip}
                  />
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
              <UseDatePicker type={'date'} name="dateEstShip" />
            </FormControl>
            <FormControl title="Source">
              <Select
                defaultValue=""
                style={{ width: '100%' }}
                onChange={(a) => setSource(a)}
                options={(sources || []).map(
                  (d: { id: number; name: string }) => ({
                    value: d.id,
                    label: d.name,
                  }),
                )}
              />
            </FormControl>

            <div className="form__footer">
              <Label>CM note</Label>
              <Input
                type="text"
                placeholder="Empty"
                name="notes"
                defaultValue=""
              />
            </div>
          </UpCollapse>
        </div>
        <div className="modal__col">
          <UpCollapse title="Person">
            <FormControl title="Name">
              <Select
                showSearch
                value={selectPersonValue?.name}
                placeholder={'Empty'}
                style={{ width: '100%' }}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearchPersonName}
                onChange={(data, record) => handleChangePerson(data, record)}
                notFoundContent={null}
                options={(personData || []).map(
                  (d: { id: number; name: string }) => ({
                    value: d.id,
                    all: d,
                    label: d.name,
                  }),
                )}
              />
            </FormControl>
            <FormControl title="Email">
              <Select
                showSearch
                value={selectPersonValue?.email}
                placeholder={'Empty'}
                style={{ width: '100%' }}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearchPersonEmail}
                onChange={(data, record) => handleChangePerson(data, record)}
                notFoundContent={null}
                options={(personData || []).map(
                  (d: { id: number; email: string }) => ({
                    value: d.id,
                    all: d,
                    label: d.email,
                  }),
                )}
              />
            </FormControl>
            <FormControl title="Phone">
              <Select
                showSearch
                value={selectPersonValue?.phone}
                placeholder={'Empty'}
                style={{ width: '100%' }}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={handleSearchPersonPhone}
                onChange={(data, record) => handleChangePerson(data, record)}
                notFoundContent={null}
                options={(personData || []).map(
                  (d: { id: number; phone: string }) => ({
                    value: d.id,
                    all: d,
                    label: d.phone,
                  }),
                )}
              />
            </FormControl>
            {selectPersonValue?.extra?.length > 0 &&
              selectPersonValue?.extra?.map((item) => (
                <FormControl key={item.id} title="Phone">
                  <Input
                    type="text"
                    placeholder="title"
                    defaultValue={item.phone}
                    name="person_phone"
                  />
                </FormControl>
              ))}
          </UpCollapse>
        </div>
      </div>
    </Modal>
  );
}
