import { Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import { useCustomers } from '../../customers/useCostumers';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../../leads/leadSlice';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../../quotes/quoteSlice';

export type SearchType = 'name' | 'email' | 'phone';

export type SearchInput = {
  type: SearchType | null;
  value: string;
};

function FeatPersonInner({ sourceType }: DrawerSourceType) {
  const dispatch = useAppDispatch();

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

  let data;

  switch (sourceType) {
    case 'lead':
      data = leadData;
      break;
    case 'quote':
      data = quoteData;
      break;
    case 'order':
      data = orderData;
      break;
    default:
      break;
  }

  const [isSelectPerson, setSelectPerson] = useState(false);

  const [searchSelect, setSearchSelect] = useState<SearchInput>({
    type: null,
    value: '',
  });

  const { customers, isFetching: isLoading } = useCustomers(isSelectPerson, {
    [searchSelect.type || 'name']: searchSelect.value,
  });

  const handleSearch = (type: SearchType, value: string) => {
    setSearchSelect({ type, value });
  };

  const handleFocus = () => {
    setSelectPerson(true);
  };

  const handleChange = (_: number | string, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      switch (sourceType) {
        case 'lead':
          dispatch(updateLeadField({ field: 'customer', value: option.data }));
          break;
        case 'quote':
          dispatch(updateQuoteField({ field: 'customer', value: option.data }));
          break;
        case 'order':
          dispatch(updateOrderField({ field: 'customer', value: option.data }));
          break;
        default:
          break;
      }
    }
  };

  if (!data) {
    return;
  }

  return (
    <>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/user.svg" alt="" />
          <div className="form-label">Name</div>
        </div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search name"
          defaultValue={data.customer.name}
          value={data.customer.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onSearch={(value) => handleSearch('name', value)}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : 'No such name '}
          options={(customers || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/mail.svg" alt="" />
          <div className="form-label">Email</div>
        </div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search email"
          defaultValue={data.customer.email}
          value={data.customer.email}
          onChange={handleChange}
          onFocus={handleFocus}
          onSearch={(value) => handleSearch('email', value)}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : 'No such email'}
          options={(customers || []).map(
            (d: { id: number; email: string }) => ({
              value: d.id,
              data: d,
              label: d.email,
            }),
          )}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <img style={{ width: 20 }} src="./img/drawer/phone.svg" alt="" />
          <div className="form-label">Phone</div>
        </div>
        <Select
          size="small"
          showSearch
          optionFilterProp="children"
          filterOption={false}
          placeholder="Search phone"
          defaultValue={data.customer.phone}
          value={data.customer.phone}
          onChange={handleChange}
          onFocus={handleFocus}
          onSearch={(value) => handleSearch('phone', value)}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : 'No such phone'}
          options={(customers || []).map(
            (d: { id: number; phone: string }) => ({
              value: d.id,
              data: d,
              label: d.phone,
            }),
          )}
        />
      </div>
    </>
  );
}

export default FeatPersonInner;
