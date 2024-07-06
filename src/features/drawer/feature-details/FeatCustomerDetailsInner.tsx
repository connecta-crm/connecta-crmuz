import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import {
  getCustomerData,
  updateField as updateCustomerField,
} from '../../customers/customerSlice';
import { useProviders } from '../../providers/useProviders';

export type SearchType = 'name' | 'email' | 'phone';

export type SearchInput = {
  type: SearchType | null;
  value: string;
};

function FeatCustomerDetailsInner({ sourceType }: DrawerSourceType) {
  const dispatch = useAppDispatch();
  const customerData = useAppSelector(getCustomerData);
  const [isSelectProvider, setSelectProvider] = useState(false);

  let data;

  switch (sourceType) {
    case 'customer':
      data = customerData;
      break;
    default:
      throw new Error(
        `There is no such '${sourceType}' in FeatCustomerDetailsInner.tsx`,
      );
  }

  // const { customers, isFetching: isLoading } = useCustomers(isSelectPerson, {
  //   [searchSelect.type || 'name']: searchSelect.value,
  // });

  const { providers, isFetching: isLoadingProviders } =
    useProviders(isSelectProvider);

  const handleChangeSource = (
    _: number | string,
    option: DefaultOptionType,
  ) => {
    if (!Array.isArray(option)) {
      switch (sourceType) {
        case 'customer':
          dispatch(
            updateCustomerField({ field: 'source', value: option.data }),
          );
          break;
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    switch (sourceType) {
      case 'customer':
        dispatch(updateCustomerField({ field, value }));
        break;
    }
  };

  if (!data) {
    return;
  }

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/accounting.svg" alt="" />
          <div className="form-label">Name</div>
        </div>
        <Input
          value={data?.name}
          defaultValue={data?.name}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/company.svg" alt="" />
          <div className="form-label">Company</div>
        </div>
        <Input
          value={data?.company}
          defaultValue={data?.company}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/email-b.svg" alt="" />
          <div className="form-label">Email</div>
        </div>
        <Input
          value={data?.email}
          defaultValue={data?.email}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/phone-b.svg" alt="" />
          <div className="form-label">Phone</div>
        </div>
        <Input
          value={data?.phone}
          defaultValue={data?.phone}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/fax-b.svg" alt="" />
          <div className="form-label">Fax</div>
        </div>
        <Input
          value={data?.fax}
          defaultValue={data?.fax}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(e) => handleChange('fax', e.target.value)}
        />
      </div>
      <br />
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/completed.svg" alt="" />
          <div className="form-label">Completed</div>
        </div>
        <div style={{ width: 215, float: 'inline-end', height: 24 }}>
          {data?.completedPrice ? '$' + data?.completedPrice : '-'}
        </div>
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/ongoing.svg" alt="" />
          <div className="form-label">Ongoing</div>
        </div>
        <div style={{ width: 215, float: 'inline-end', height: 24 }}>
          {data?.ongoingPrice ? '$' + data?.ongoingPrice : '-'}
        </div>
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img
            style={{ width: 20 }}
            src="./img/drawer/uncompleted.svg"
            alt=""
          />
          <div className="form-label">Uncompleted</div>
        </div>
        <div style={{ width: 215, float: 'inline-end', height: 24 }}>
          {data?.unCompletedPrice ? '$' + data?.unCompletedPrice : '-'}
        </div>
      </div>
      <br />
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/insurance.svg" alt="" />
          <div className="form-label">Open Tasks</div>
        </div>
        <div style={{ width: 215, float: 'inline-end', height: 24 }}>
          {data?.tasks || '0'}
        </div>
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/link-b.svg" alt="" />
          <div className="form-label">Source</div>
        </div>
        <Select
          size="small"
          filterOption={false}
          placeholder="Search provider"
          defaultValue={data?.source?.name || 'unknown'}
          value={data?.source?.name || 'unknown'}
          onChange={handleChangeSource}
          onFocus={() => setSelectProvider(true)}
          style={{ width: 218 }}
          loading={isLoadingProviders}
          notFoundContent={
            isLoadingProviders ? <Spin size="small" /> : 'No such source'
          }
          options={(providers || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name || 'unknown',
          }))}
        />
      </div>
      <div className="d-flex mb-5 mt-20">
        <div className="w-100">
          <div className="form-label pl-0">Note about the customer</div>
          <Input
            value={customerData.note}
            defaultValue={customerData.note}
            size="small"
            style={{ width: '100%', float: 'inline-end', height: 24 }}
            onChange={(e) => handleChange('note', e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default FeatCustomerDetailsInner;
