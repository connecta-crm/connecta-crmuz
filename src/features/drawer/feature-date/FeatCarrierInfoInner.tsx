import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import { useCustomers } from '../../customers/useCostumers';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../../orders/orderSlice';
import { SearchInput, SearchType } from '../feature-details/FeatPersonInner';

function FeatCarrierInfoInner({ sourceType }: DrawerSourceType) {
  const dispatch = useAppDispatch();

  const orderData = useAppSelector(getOrderData);

  let data;

  switch (sourceType) {
    case 'order':
      data = orderData;
      break;
    default:
      break;
  }

  // const handleChange = (field: string, value: string | string[]) => {
  //   if (!Array.isArray(value)) {
  //     switch (sourceType) {
  //       case 'order':
  //         dispatch(updateOrderField({ field, value }));
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // };

  const [isSelect, setSelect] = useState(false);

  const [searchSelect, setSearchSelect] = useState<SearchInput>({
    type: null,
    value: '',
  });

  const { customers, isFetching: isLoading } = useCustomers(isSelect, {
    [searchSelect.type || 'name']: searchSelect.value,
  });

  const handleSearch = (type: SearchType, value: string) => {
    setSearchSelect({ type, value });
  };

  const handleFocus = () => {
    setSelect(true);
  };

  const handleChange = (_: number | string, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      switch (sourceType) {
        case 'order':
          dispatch(updateOrderField({ field: 'carrier', value: option.data }));
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
          <div className="form-label pl-0">Company</div>
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
          notFoundContent={
            isLoading ? <Spin size="small" /> : 'No such company '
          }
          options={(customers || []).map((d: { id: number; name: string }) => ({
            value: d.id,
            data: d,
            label: d.name,
          }))}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Location</div>
        </div>
        <Input
          value={'5522 Claredon Hills Rd Clarendon Hills IL 60514'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Phone</div>
        </div>
        <Input
          value={'(999) 999-9999'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Email</div>
        </div>
        <Input
          value={'test@mail.io'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="mb-20"></div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Will be paid by</div>
        </div>
        <Input
          value={'COD to carrier'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Payment Term</div>
        </div>
        <Input
          value={'Immediately'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Term Begins</div>
        </div>
        <Input
          value={'After delivery'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">COD method</div>
        </div>
        <Input
          value={'Cash/Certified fund'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Payment type</div>
        </div>
        <Input
          value={'Cash'}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
    </>
  );
}

export default FeatCarrierInfoInner;
