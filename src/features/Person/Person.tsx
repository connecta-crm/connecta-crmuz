import { LoadingOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import FormControl from '../../ui/Form/FormControl';
import Input from '../../ui/Form/Input';
import UpCollapse from '../../ui/Form/UpCollapse';
import {
  useCreateNumber,
  useCreatePerson,
  usePerson,
} from '../leads/useLeadDetails';
export default function Person({
  setPersonId,
}: {
  setPersonId: (a: string | null) => void;
}) {
  const [newCustomer, setNewCustomer] = useState<{name:string,email:string,phone:string}>({
    name: '',
    email: '',
    phone: '',
  });
  const [addNumber, setAddNumber] = useState(false);
  const [newNumberValue, setNewNumberValue] = useState('');
  const [create, setCreate] = useState(false);
  const [selectPersonValue, setSelectPersonValue] =
    useState<DefaultOptionType | null>(null);
  const [person, setPerson] = useState({ name: '', phone: '', email: '' });
  const [customer, setCustomer] = useState<string>('');
  const [disabled, setDisabled] = useState(true);

  const [url, seturl] = useState('');
  useEffect(() => {
    const searchParam = new URLSearchParams(person);
    seturl(searchParam.toString());
  }, [person]);

  const personData = usePerson(url);

  const handleSearchPersonName = (newValue: string) => {
    setNewCustomer({ name: newValue, email: '', phone: '' });
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, name: newValue });
  };
  const handleSearchPersonEmail = (newValue: string) => {
    setNewCustomer({ name: '', email: newValue, phone: '' });
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, email: newValue });
  };
  const handleSearchPersonPhone = (newValue: string) => {
    setNewCustomer({ name: '', email: '', phone: newValue });
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue(null);
    setPerson({ ...person, phone: newValue });
  };

  const handleChangePerson = (newValue: string, record: DefaultOptionType) => {
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue(record.all);
    setCustomer(newValue);
    setPersonId(newValue);
    setNewNumberValue('');
  };

  const onChangeInput = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (create) {
      if (
        newCustomer.name &&
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
    setPerson({ name: '', phone: '', email: '' });
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
      <FormControl title="Name">
        {create ? (
          <input
            type="text"
            placeholder="Enter name"
            required
            name="name"
            value={newCustomer.name}
            onChange={onChangeInput}
          />
        ) : (
          <Select
            showSearch
            value={selectPersonValue?.name}
            placeholder={'Search name'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearchPersonName}
            onChange={(data, record) => handleChangePerson(data, record)}
            notFoundContent={
              <Button onClick={() => setCreate(true)} size="small">
                create
              </Button>
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
      <FormControl title="Email">
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
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearchPersonEmail}
            onChange={(data, record) => handleChangePerson(data, record)}
            notFoundContent={
              <Button onClick={() => setCreate(true)} size="small">
                create
              </Button>
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

      <FormControl title="Phone">
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
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearchPersonPhone}
            onChange={(data, record) => handleChangePerson(data, record)}
            notFoundContent={
              <Button onClick={() => setCreate(true)} size="small">
                create
              </Button>
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
              onClick={createContact}
            >
              {!isLoading ? 'save' : <LoadingOutlined />}
            </Button>
          </div>
        </div>
      )}
      {selectPersonValue?.extra?.length > 0 &&
        selectPersonValue?.extra?.map((item: DefaultOptionType) => (
          <FormControl key={item.id} title="Phone">
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
            <FormControl title="Phone">
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
              >
                {!isPending ? 'save' : <LoadingOutlined />}
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
