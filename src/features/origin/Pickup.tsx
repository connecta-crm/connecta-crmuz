import { Button, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { ReactNode, useEffect, useState } from 'react';
import DownCollapse from '../../ui/form/DownCollapse';
import Input from '../../ui/form/Input';
import InputCol from '../../ui/form/InputCol';
import InputRow from '../../ui/form/InputRow';
import Label from '../../ui/form/Label';
import {
  useCity,
  useCreateZipCode,
  useStateCod,
} from '../leads/useLeadDetails';
import origin from '/img/drawer/origin.svg';
type CityType = {
  id?: string;
  name?: string;
  state?: { id: string; name: string; code: string };
  zip?: string;
};
export type ZipCodeType = {
  name: string;
  zip: string;
  stateCode: string;
};

export default function Pickup({
  setPickup,
  children,
  setOriginZepCode,
}: {
  setPickup: (a: string | null) => void;
  setOriginZepCode: (a: string) => void;
  children?: ReactNode;
}) {
  const [cityValue, setCityValue] = useState<CityType | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const { citys, isFetching: isLoading } = useCity(searchCity);

  const { createZip, isLoadingZip } = useCreateZipCode();
  const [createZipCode, setCreateZipCode] = useState<ZipCodeType>({
    name: '',
    zip: '',
    stateCode: '',
  });
  const [create, setCreate] = useState(false);
  const [searchStateCod, setSearchStateCode] = useState('');
  const { stateCodes, isLoadingState } = useStateCod(searchStateCod);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (
      createZipCode.name &&
      createZipCode.stateCode &&
      createZipCode.zip &&
      createZipCode.zip.length == 5
    ) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [createZipCode]);

  const onCreateZipCode = () => {
    createZip(createZipCode, {
      onSuccess: () => {
        setCityValue(null);
        setCreate(false);
        setCreateZipCode({
          name: '',
          zip: '',
          stateCode: '',
        });
      },
    });
  };

  const onChangeHandler = (value: string, data: DefaultOptionType) => {
    setPickup(value);
    setCityValue(data.data);
    setOriginZepCode(data?.data?.zip);
  };

  return (
    <DownCollapse title="Origin" img={origin}>
      <InputRow>
        <InputCol>
          <Label>Pickup city</Label>
        </InputCol>
        <InputCol>
          {create ? (
            <input
              value={createZipCode.name}
              type="text"
              placeholder="Enter  name"
              onChange={(e) =>
                setCreateZipCode({ ...createZipCode, name: e.target.value })
              }
            />
          ) : (
            <Select
              showSearch
              value={cityValue?.name}
              optionFilterProp="children"
              placeholder={'Search  city'}
              style={{ width: '100%' }}
              loading={isLoading}
              filterOption={false}
              defaultActiveFirstOption={false}
              // onFocus={() => setEnabled(true)}
              onSearch={(value) => setSearchCity(value)}
              notFoundContent={isLoading ? <Spin size="small" /> : 'No data'}
              onChange={(
                value,
                record: DefaultOptionType | DefaultOptionType[],
              ) => onChangeHandler(value, record)}
              options={(citys || []).map(
                (d: {
                  id: number;
                  name: string;
                  zip: string;
                  state: { code: string };
                }) => ({
                  value: d.id,
                  data: d,
                  label: d.name + ', ' + d.state.code + ' ' + d.zip,
                }),
              )}
            />
          )}
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Pickup state</Label>
        </InputCol>

        <InputCol>
          {create ? (
            <Select
              showSearch
              optionFilterProp="children"
              placeholder={'Search state code'}
              style={{ width: '100%' }}
              loading={isLoadingState}
              filterOption={false}
              defaultActiveFirstOption={false}
              onSearch={(value) => setSearchStateCode(value)}
              notFoundContent={
                isLoadingState ? <Spin size="small" /> : 'No data'
              }
              onChange={(value) =>
                setCreateZipCode({ ...createZipCode, stateCode: value })
              }
              options={(stateCodes || []).map((d: { code: string }) => ({
                value: d.code,
                label: d.code,
              }))}
            />
          ) : (
            <Input
              type="text"
              placeholder="Empty"
              name="disabled_value"
              defaultValue={cityValue?.state?.code}
            />
          )}
        </InputCol>
      </InputRow>
      <InputRow>
        <InputCol>
          <Label>Pickup zip</Label>
        </InputCol>

        <InputCol>
          {create ? (
            <input
              type="text"
              placeholder="State zip"
              maxLength={5}
              max={5}
              value={createZipCode.zip}
              onChange={(e) =>
                setCreateZipCode({ ...createZipCode, zip: e.target.value })
              }
            />
          ) : (
            <Select
              showSearch
              value={cityValue?.zip}
              optionFilterProp="children"
              placeholder={'Search  zip'}
              style={{ width: '100%' }}
              loading={isLoading}
              defaultActiveFirstOption={false}
              filterOption={false}
              onSearch={(value) => {
                setSearchCity(value);
                setCreateZipCode({ ...createZipCode, zip: value });
              }}
              notFoundContent={
                isLoading ? (
                  <Spin size="small" />
                ) : (
                  <Button onClick={() => setCreate(true)} size="small">
                    create
                  </Button>
                )
              }
              onChange={(
                value,
                record: DefaultOptionType | DefaultOptionType[],
              ) => onChangeHandler(value, record)}
              options={(citys || []).map(
                (d: {
                  id: number;
                  name: string;
                  zip: string;
                  state: { code: string };
                }) => ({
                  value: d.id,
                  data: d,
                  label: d.name + ', ' + d.state.code + ' ' + d.zip,
                }),
              )}
            />
          )}
        </InputCol>
      </InputRow>
      <InputRow>
        {create && (
          <div className=" w-100 d-flex justify-end">
            <Button
              size="small"
              onClick={() => {
                setCreate(false);
                setCreateZipCode({ name: '', zip: '', stateCode: '' });
              }}
            >
              cancel
            </Button>
            <Button
              disabled={!disabled || isLoadingZip}
              size="small"
              type="primary"
              className="ml-5"
              onClick={onCreateZipCode}
            >
              <>
                {isLoadingZip && <Spin size="small" className="mr-5" />}
                Save
              </>
            </Button>
          </div>
        )}
      </InputRow>
      {children}
    </DownCollapse>
  );
}
