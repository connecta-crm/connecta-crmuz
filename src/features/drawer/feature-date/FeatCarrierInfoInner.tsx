import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { DrawerSourceType } from '../../../ui/Drawer';
import { useCarriers } from '../../carriers/useCarriers';
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

  const [isSelect, setSelect] = useState(false);

  const [searchSelect, setSearchSelect] = useState<SearchInput>({
    type: null,
    value: '',
  });

  const { carriers, isFetching: isLoading } = useCarriers(isSelect, {
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
          dispatch(
            updateOrderField({
              field: 'dispatchData.carrierData',
              value: option.data,
            }),
          );
          break;
        default:
          break;
      }
    }
  };

  if (!data) {
    return;
  }

  const {
    carrierData,
    dispatchCodMethod,
    dispatchPaidBy,
    dispatchPaymentTerm,
    dispatchPaymentType,
    dispatchTermBegins,
  } = data.dispatchData;

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
          placeholder="Search company"
          defaultValue={carrierData.name}
          value={carrierData.name}
          onChange={handleChange}
          onFocus={handleFocus}
          onSearch={(value) => handleSearch('name', value)}
          style={{ width: 218 }}
          loading={isLoading}
          notFoundContent={
            isLoading ? <Spin size="small" /> : 'No such carrier '
          }
          options={(carriers || []).map((d: { id: number; name: string }) => ({
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
          value={carrierData.location}
          defaultValue={carrierData.location}
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
          value={carrierData.phone}
          defaultValue={carrierData.phone}
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
          value={carrierData.phone2}
          defaultValue={carrierData.phone2}
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
          value={carrierData.email}
          defaultValue={carrierData.email}
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
          value={dispatchPaidBy || ''}
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
          value={dispatchPaymentTerm || ''}
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
          value={dispatchTermBegins || ''}
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
          value={dispatchCodMethod || ''}
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
          value={dispatchPaymentType || ''}
          size="small"
          disabled
          style={{ width: 218, float: 'inline-end', height: 24 }}
        />
      </div>
    </>
  );
}

export default FeatCarrierInfoInner;
