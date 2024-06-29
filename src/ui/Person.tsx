import { Button, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import {
  useCreateNumber,
  useCreatePerson,
  usePerson,
} from '../features/leads/useLeadDetails';
import FormControl from './form/FormControl';
import Input from './form/Input';
import UpCollapse from './form/UpCollapse';
import email from '/img/drawer/mail.svg';
import phone from '/img/drawer/phone.svg';
import user from '/img/drawer/user.svg';
export default function Person({
  setPersonId,
}: {
  setPersonId: (a: string | null) => void;
}) {
  const [newCustomer, setNewCustomer] = useState<{
    name: string;
    email: string;
    phone: string;
    lastName: string;
  }>({
    name: '',
    email: '',
    phone: '',
    lastName: '',
  });
  const [addNumber, setAddNumber] = useState(false);
  const [newNumberValue, setNewNumberValue] = useState('');
  const [create, setCreate] = useState(false);
  const [selectPersonValue, setSelectPersonValue] =
    useState<DefaultOptionType | null>(null);
  const [person, setPerson] = useState({
    name: '',
    phone: '',
    email: '',
    lastName: '',
  });
  const [customer, setCustomer] = useState<string>('');
  const [disabled, setDisabled] = useState(true);

  const [url, seturl] = useState('');
  useEffect(() => {
    if (person.name || person.email || person.phone || person.lastName) {
      const searchParam = new URLSearchParams(person);
      seturl(searchParam.toString());
    }
  }, [person]);

  const { personData, isFetching } = usePerson(url);

  const handleSearchPersonName = (newValue: string) => {
    setNewCustomer({ name: newValue, email: '', phone: '', lastName: '' });
    setPerson({ name: '', phone: '', email: '', lastName: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, name: newValue });
  };
  const handleSearchPersonLastName = (newValue: string) => {
    setNewCustomer({ name: '', email: '', phone: '', lastName: newValue });
    setPerson({ name: '', phone: '', email: '', lastName: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, lastName: newValue });
  };
  const handleSearchPersonEmail = (newValue: string) => {
    setNewCustomer({ name: '', email: newValue, phone: '', lastName: '' });
    setPerson({ name: '', phone: '', email: '', lastName: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, email: newValue });
  };
  const handleSearchPersonPhone = (newValue: string) => {
    setNewCustomer({ name: '', email: '', phone: newValue, lastName: '' });
    setPerson({ name: '', phone: '', email: '', lastName: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, phone: newValue });
  };

  const handleChangePerson = (newValue: string, record: DefaultOptionType) => {
    setPerson({ name: '', phone: '', email: '', lastName: '' });
    setSelectPersonValue(record.all);
    setCustomer(newValue);
    setPersonId(newValue);
    setNewNumberValue('');
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (create) {
      if (
        newCustomer.name &&
        newCustomer.lastName &&
        newCustomer.email.match(/^\S+@\S+\.\S+$/) &&
        newCustomer.phone
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [newCustomer]);

  const { createPerson, isLoading, isSuccess } = useCreatePerson();

  useEffect(() => {
    if (isSuccess) {
      setCreate(false);
    }
  }, [isLoading, isSuccess]);

  const createContact = () => {
    createPerson(newCustomer);
  };

  useEffect(() => {
    setPerson({ name: '', phone: '', email: '', lastName: '' });
  }, [create]);

  const { createNumber, isPending } = useCreateNumber();
  const createNewNumber = () => {
    createNumber(
      { phone: newNumberValue, customer: customer },
      {
        onSuccess: (data) => {
          if (data && selectPersonValue) {
            setSelectPersonValue({
              ...selectPersonValue,
              extra: [...selectPersonValue.extra, data],
            });
            setAddNumber(false);
            setNewNumberValue('');
          }
        },
      },
    );
  };

  return (
    <UpCollapse title="Person">
      <FormControl title="Name" img={user}>
        {create ? (
          <input
            type="text"
            placeholder="Enter name"
            required
            name="name"
            value={newCustomer.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeInput(e)
            }
          />
        ) : (
          <Select
            showSearch
            value={selectPersonValue?.name}
            placeholder={'Search name'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearchPersonName}
            onChange={(data, record) => handleChangePerson(data, record)}
            loading={isFetching}
            notFoundContent={
              isFetching ? (
                <Spin size="small" />
              ) : (
                <Button onClick={() => setCreate(true)} size="small">
                  create
                </Button>
              )
            }
            options={(personData || []).map(
              (d: { id: number; name: string }) => ({
                value: d.id,
                all: d,
                label: d.name,
              }),
            )}
          />
        )}
      </FormControl>

      <FormControl title="Last name" img={user}>
        {create ? (
          <input
            type="text"
            placeholder="Enter last name"
            required
            name="lastName"
            value={newCustomer.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeInput(e)
            }
          />
        ) : (
          <Select
            showSearch
            value={selectPersonValue?.lastName}
            placeholder={'Search lastname'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearchPersonLastName}
            onChange={(data, record) => handleChangePerson(data, record)}
            loading={isFetching}
            notFoundContent={
              isFetching ? (
                <Spin size="small" />
              ) : (
                <Button onClick={() => setCreate(true)} size="small">
                  create
                </Button>
              )
            }
            options={(personData || []).map(
              (d: { id: number; lastName: string }) => ({
                value: d.id,
                all: d,
                label: d.lastName,
              }),
            )}
          />
        )}
      </FormControl>

      <FormControl title="Email" img={email}>
        {create ? (
          <input
            autoComplete="off"
            type="text"
            placeholder="Enter email"
            required
            name="email"
            value={newCustomer.email}
            onChange={onChangeInput}
          />
        ) : (
          <Select
            showSearch
            value={selectPersonValue?.email}
            placeholder={'Search email'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearchPersonEmail}
            onChange={(data, record) => handleChangePerson(data, record)}
            loading={isFetching}
            notFoundContent={
              isFetching ? (
                <Spin size="small" />
              ) : (
                <Button onClick={() => setCreate(true)} size="small">
                  create
                </Button>
              )
            }
            options={(personData || []).map(
              (d: { id: number; email: string }) => ({
                value: d.id,
                all: d,
                label: d.email,
              }),
            )}
          />
        )}
      </FormControl>

      <FormControl title="Phone" img={phone}>
        {create ? (
          <input
            autoComplete="off"
            type="number"
            placeholder="Enter phone"
            required
            name="phone"
            value={newCustomer.phone}
            onChange={onChangeInput}
          />
        ) : (
          <Select
            showSearch
            value={selectPersonValue?.phone}
            placeholder={'Search phone'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleSearchPersonPhone}
            onChange={(data, record) => handleChangePerson(data, record)}
            loading={isFetching}
            notFoundContent={
              isFetching ? (
                <Spin size="small" />
              ) : (
                <Button onClick={() => setCreate(true)} size="small">
                  create
                </Button>
              )
            }
            options={(personData || []).map(
              (d: { id: number; phone: string }) => ({
                value: d.id,
                all: d,
                label: d.phone,
              }),
            )}
          />
        )}
      </FormControl>
      {create && (
        <div className="create__contact__actions">
          <span className="create__contact__error-message">
            {/* Lorem ipsum dolor sit amet. */}
          </span>
          <div className="">
            <Button size="small" onClick={() => setCreate(false)}>
              cancel
            </Button>
            <Button
              size="small"
              type="primary"
              disabled={disabled}
              loading={isLoading}
              onClick={createContact}
            >
              save
            </Button>
          </div>
        </div>
      )}
      {selectPersonValue?.extra?.length > 0 &&
        selectPersonValue?.extra?.map((item: DefaultOptionType) => (
          <FormControl key={item.id} title="Phone" img={phone}>
            <Input
              type="text"
              placeholder="title"
              defaultValue={item.phone}
              name="disabled_value"
            />
          </FormControl>
        ))}
      {!create && (
        <>
          {addNumber && selectPersonValue && (
            <FormControl title="Phone" img={phone}>
              <input
                autoComplete="off"
                value={newNumberValue}
                type="number"
                placeholder="Enter new phone"
                onChange={(e) => setNewNumberValue(e.target.value)}
              />
              <Button
                onClick={createNewNumber}
                disabled={newNumberValue ? false : true}
                size="small"
                type="primary"
                loading={isPending}
              >
                save
              </Button>
            </FormControl>
          )}
          <FormControl title="add">
            <Button
              disabled={selectPersonValue ? false : true}
              size="small"
              onClick={() => setAddNumber(!addNumber)}
            >
              {addNumber ? 'cancel' : '+'}
            </Button>
          </FormControl>
        </>
      )}
    </UpCollapse>
  );
}
