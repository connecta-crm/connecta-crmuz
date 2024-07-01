/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collapse, CollapseProps, DatePicker, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useCustomers } from '../customers/useCostumers';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import {
  SearchInput,
  SearchType,
} from '../drawer/feature-details/FeatPersonInner';
import ConvertDetailMainContent from './convert/ConvertDetailMainContent';
import {
  fetchQuoteConvertData,
  getQuoteConvertData,
  updateConvertField,
} from './quoteConvertSlice';

function QuoteConvertModalContent() {
  const quoteConvertData = useAppSelector(getQuoteConvertData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuoteConvertData());
  }, [dispatch]);

  const [searchSelect, setSearchSelect] = useState<SearchInput>({
    type: null,
    value: '',
  });

  const [isSelectPerson, setSelectPerson] = useState(false);

  const { customers, isFetching: isLoadingCustomers } = useCustomers(
    isSelectPerson,
    {
      [searchSelect.type || 'name']: searchSelect.value,
    },
  );

  const handleChange = useCallback((field: string, value: string) => {
    dispatch(updateConvertField({ field, value }));
  }, []);

  const handleChangeDate = useCallback(
    (field: string, value: string | string[]) => {
      if (!Array.isArray(value)) {
        dispatch(updateConvertField({ field, value }));
      }
    },
    [],
  );

  const handleChangePerson = (
    _: number | string,
    option: DefaultOptionType,
  ) => {
    dispatch(updateConvertField({ field: 'customer', value: option.data }));
  };

  const handleFocusPerson = () => {
    setSelectPerson(true);
  };

  const handleSearch = (type: SearchType, value: string) => {
    setSearchSelect({ type, value });
  };

  const itemsForPerson: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Person</span>
        </div>
      ),
      children: (
        <>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Name</div>
            </div>
            <Select
              size="small"
              showSearch
              optionFilterProp="children"
              filterOption={false}
              placeholder="Search name"
              defaultValue={quoteConvertData.customer?.name}
              value={quoteConvertData.customer?.name}
              onChange={handleChangePerson}
              onFocus={handleFocusPerson}
              onSearch={(value) => handleSearch('name', value)}
              style={{ width: 218 }}
              loading={isLoadingCustomers}
              notFoundContent={
                isLoadingCustomers ? <Spin size="small" /> : 'No such name '
              }
              options={(customers || []).map(
                (d: { id: number; name: string }) => ({
                  value: d.id,
                  data: d,
                  label: d.name,
                }),
              )}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Email</div>
            </div>
            <Select
              size="small"
              showSearch
              optionFilterProp="children"
              filterOption={false}
              placeholder="Search email"
              defaultValue={quoteConvertData.customer?.email}
              value={quoteConvertData.customer?.email}
              onChange={handleChangePerson}
              onFocus={handleFocusPerson}
              onSearch={(value) => handleSearch('email', value)}
              style={{ width: 218 }}
              loading={isLoadingCustomers}
              notFoundContent={
                isLoadingCustomers ? <Spin size="small" /> : 'No such email'
              }
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
              <div className="form-label pl-0">Phone</div>
            </div>
            <Select
              size="small"
              showSearch
              optionFilterProp="children"
              filterOption={false}
              placeholder="Search phone"
              defaultValue={quoteConvertData.customer?.phone}
              value={quoteConvertData.customer?.phone}
              onChange={handleChangePerson}
              onFocus={handleFocusPerson}
              onSearch={(value) => handleSearch('phone', value)}
              style={{ width: 218 }}
              loading={isLoadingCustomers}
              notFoundContent={
                isLoadingCustomers ? <Spin size="small" /> : 'No such phone'
              }
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
      ),
      className: 'feature-drawer__item',
    },
  ];

  const itemsForDate: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Date</span>
        </div>
      ),
      children: (
        <>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Est. Ship Date</div>
            </div>
            <DatePicker
              format={{
                format: 'MM-DD-YYYY',
                type: 'mask',
              }}
              allowClear={false}
              type="date"
              name="est_ship_date"
              value={
                dayjs(
                  quoteConvertData?.dateEstShip,
                  'MM-DD-YYYY',
                ) as unknown as string
              }
              defaultValue={
                dayjs(
                  quoteConvertData?.dateEstShip,
                  'MM-DD-YYYY',
                ) as unknown as string
              }
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record: string | string[]) =>
                handleChangeDate('dateEstShip', record)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Est. PU Date</div>
            </div>
            <DatePicker
              format={{
                format: 'MM-DD-YYYY',
                type: 'mask',
              }}
              allowClear={false}
              type="date"
              name="est_pu_date"
              value={
                quoteConvertData?.dateEstPu
                  ? (dayjs(
                      quoteConvertData?.dateEstPu,
                      'MM-DD-YYYY',
                    ) as unknown as string)
                  : undefined
              }
              defaultValue={
                quoteConvertData?.dateEstPu
                  ? (dayjs(
                      quoteConvertData?.dateEstPu,
                      'MM-DD-YYYY',
                    ) as unknown as string)
                  : undefined
              }
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record: string | string[]) =>
                handleChangeDate('dateEstPu', record)
              }
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="d-flex">
              <div className="form-label pl-0">Est. DEL Date</div>
            </div>
            <DatePicker
              format={{
                format: 'MM-DD-YYYY',
                type: 'mask',
              }}
              allowClear={false}
              type="date"
              name="est_del_date"
              value={
                quoteConvertData?.dateEstDel
                  ? (dayjs(
                      quoteConvertData?.dateEstDel,
                      'MM-DD-YYYY',
                    ) as unknown as string)
                  : undefined
              }
              defaultValue={
                quoteConvertData?.dateEstDel
                  ? (dayjs(
                      quoteConvertData?.dateEstDel,
                      'MM-DD-YYYY',
                    ) as unknown as string)
                  : undefined
              }
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(_, record: string | string[]) =>
                handleChangeDate('dateEstDel', record)
              }
            />
          </div>
        </>
      ),
      className: 'feature-drawer__item',
    },
  ];

  const itemsForPayment: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Payment</span>
        </div>
      ),
      children: (
        <>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Total tariff</div>
            <Input
              value={quoteConvertData?.paymentTotalTariff}
              defaultValue={quoteConvertData?.paymentTotalTariff}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChange('paymentTotalTariff', e.target.value)
              }
            />
          </div>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Reservation</div>
            <Input
              value={quoteConvertData?.paymentReservation}
              defaultValue={quoteConvertData?.paymentReservation}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChange('paymentReservation', e.target.value)
              }
            />
          </div>
          <div className="d-flex align-center justify-between mb-5">
            <div className="modal__input-label">Carrier pay</div>
            <Input
              value={quoteConvertData?.paymentCarrierPay}
              defaultValue={quoteConvertData?.paymentCarrierPay}
              style={{ width: 218, float: 'inline-end', height: 24 }}
              onChange={(e) =>
                handleChange('paymentCarrierPay', e.target.value)
              }
            />
          </div>
        </>
      ),
      className: 'feature-drawer__item',
    },
  ];

  return (
    <div className="modal__row dispatch-modal convert-modal">
      <div className="modal__col p-0">
        <ConvertDetailMainContent />
      </div>
      <div className="modal__col p-0">
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForPerson}
        />
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForDate}
        />
        <Collapse
          ghost
          collapsible="header"
          defaultActiveKey={['1']}
          expandIcon={DrawerArrowIcon}
          items={itemsForPayment}
        />
      </div>
    </div>
  );
}

export default QuoteConvertModalContent;
