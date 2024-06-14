// ! THIS COMPONENT IS NOT USED ANYWHERE

import { Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';
import { CarrierData } from '../../models';
import {
  DISPATCH_CODE_METHOD,
  DISPATCH_PAID_BY,
  DISPATCH_PAYMENT_TERM,
  DISPATCH_PAYMENT_TYPE,
  DISPATCH_TERM_BEGINS,
} from '../../utils/constants';
import { useCarriers } from '../carriers/useCarriers';
import {
  SearchInput,
  SearchType,
} from '../drawer/feature-details/FeatPersonInner';

const initialCarrierData: CarrierData = {
  locationName: '',
  name: '',
  address: '',
  mcNumber: '',
  contactName: '',
  phone: '',
  phone2: '',
  email: '',
  fax: '',
  status: '',
  location: null,
};

const initialDispatchData = {
  dispatchCodMethod: '',
  dispatchPaidBy: '',
  dispatchPaymentTerm: '',
  dispatchPaymentType: '',
  dispatchTermBegins: '',
};

function OrderDispatchModalCarrierItem() {
  const [isSelect, setSelect] = useState(false);

  const [carrierData, setCarrierData] = useState(initialCarrierData);
  const [dispatchData, setDispatchData] = useState(initialDispatchData);

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

  const handleChangeDispatch = (
    field: string,
    option:
      | {
          value: string;
          label: string;
        }
      | { value: string; label: string }[],
  ) => {
    if (!Array.isArray(option)) {
      setDispatchData({ ...dispatchData, [field]: option.value });
    }
  };

  const handleChangeCompany = (_: number, option: DefaultOptionType) => {
    if (!Array.isArray(option)) {
      setCarrierData({ ...option.data });
    }
  };

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
          onChange={handleChangeCompany}
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
          value={carrierData.location || ''}
          defaultValue={carrierData.location || ''}
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
        <Select
          value={dispatchData.dispatchPaidBy || ''}
          defaultValue={dispatchData.dispatchPaidBy || ''}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) =>
            handleChangeDispatch('dispatchPaidBy', record)
          }
          options={DISPATCH_PAID_BY}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Payment Term</div>
        </div>
        <Select
          value={dispatchData.dispatchPaymentTerm || ''}
          defaultValue={dispatchData.dispatchPaymentTerm || ''}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) =>
            handleChangeDispatch('dispatchPaymentTerm', record)
          }
          options={DISPATCH_PAYMENT_TERM}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Term Begins</div>
        </div>
        <Select
          value={dispatchData.dispatchTermBegins || ''}
          defaultValue={dispatchData.dispatchTermBegins || ''}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) =>
            handleChangeDispatch('dispatchTermBegins', record)
          }
          options={DISPATCH_TERM_BEGINS}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">COD method</div>
        </div>
        <Select
          value={dispatchData.dispatchCodMethod || ''}
          defaultValue={dispatchData.dispatchCodMethod || ''}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) =>
            handleChangeDispatch('dispatchCodMethod', record)
          }
          options={DISPATCH_CODE_METHOD}
        />
      </div>
      <div className="d-flex justify-between mb-5">
        <div className="d-flex">
          <div className="form-label pl-0">Payment type</div>
        </div>
        <Select
          value={dispatchData.dispatchPaymentType || ''}
          defaultValue={dispatchData.dispatchPaymentType || ''}
          style={{ width: 218, float: 'inline-end', height: 24 }}
          onChange={(_, record) =>
            handleChangeDispatch('dispatchPaymentType', record)
          }
          options={DISPATCH_PAYMENT_TYPE}
        />
      </div>
    </>
  );
}

export default OrderDispatchModalCarrierItem;
