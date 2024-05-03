import { Select } from 'antd';
import { useEffect, useState } from 'react';
import FormControl from '../../ui/Form/FormControl';
import Input from '../../ui/Form/Input';
import UpCollapse from '../../ui/Form/UpCollapse';
import { usePerson } from '../leads/useLeadDetails';
export default function Person() {
  const [selectPersonValue, setSelectPersonValue] = useState({});
  const [person, setPerson] = useState({ name: '', phone: '', email: '' });
  const [customer, setCustomer] = useState<string | null>('');
  console.log(customer);

  const [url, seturl] = useState('');
  useEffect(() => {
    const searchParam = new URLSearchParams(person);
    seturl(searchParam.toString());
  }, [person]);

  const personData = usePerson(url);

  const handleSearchPersonName = (newValue: string) => {
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue({});
    setPerson({ ...person, name: newValue });
    console.log(personData);
    
  };
  const handleSearchPersonEmail = (newValue: string) => {
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue({});
    setPerson({ ...person, email: newValue });
  };
  const handleSearchPersonPhone = (newValue: string) => {
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue({});
    setPerson({ ...person, phone: newValue });
  };

  const handleChangePerson = (newValue: string, record) => {
    setPerson({ name: '', phone: '', email: '' });
    setSelectPersonValue(record.all);
    setCustomer(newValue);
  };

  return (
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
          //   notFoundContent={null}
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
          //   notFoundContent={null}
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
          //   notFoundContent={null}
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
              name="disabled_value"
            />
          </FormControl>
        ))}
    </UpCollapse>
  );
}
