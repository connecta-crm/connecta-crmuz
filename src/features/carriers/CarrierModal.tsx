import { Collapse, CollapseProps, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import HighlightedWord from '../../ui/HighlightedWord';
import Modal from '../../ui/Modal';
import { useCities } from '../address/useCities';
import DrawerArrowIcon from '../drawer/DrawerArrowIcon';
import DrawerFeatureRow from '../drawer/DrawerFeatureRow';
import { CreateCarrierParams, useCreateCarrier } from './useCreateCarrier';

type CarrierModalProps = {
  openModal: boolean;
  onOpenModal: (val: boolean) => void;
};

const initialCarrierData: CreateCarrierParams = {
  name: '',
  address: '',
  mcNumber: '',
  contactName: '',
  phone: '',
  phone2: '',
  email: '',
  fax: '',
  status: 'favorite', // todo, it might be change
  location: 0,
};

const initialLocationData = {
  id: 0,
  name: '',
  zip: '',
  state: {
    name: '',
  },
};

function CarrierModal({ openModal, onOpenModal }: CarrierModalProps) {
  const [carrierData, setCarrierData] =
    useState<CreateCarrierParams>(initialCarrierData);

  const [locationData, setLocationData] = useState(initialLocationData);

  const { createCarrier, isLoading, isSuccess } = useCreateCarrier();

  const handleSave = () => {
    createCarrier({ ...carrierData, location: locationData.id });
  };

  const handleChange = (field: string, value: string) => {
    setCarrierData({ ...carrierData, [field]: value });
  };

  const [isSelectCity, setSelectCity] = useState(true);
  const [searchCity, setSearchCity] = useState<string | null>(null);
  // const [select, setSelect] = useState(false);

  const { cities, isLoading: isLoadingCities } = useCities(searchCity);

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };

  const handleSearchCity = (value: string) => {
    setSelectCity(false);
    setSearchCity(value);
  };

  const handleChangeCity = (_: number | string, option: DefaultOptionType) => {
    setLocationData(option?.data);
  };

  const closedModal = () => {
    onOpenModal(false);
    setCarrierData(initialCarrierData);
    setLocationData(initialLocationData);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      closedModal();
    }
  }, [isLoading, isSuccess]);

  const locationItems: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="detail detail-origin detail-convert">
          <div className="detail__header d-flex align-center justify-between">
            <div className="detail__left d-flex align-center">
              <div className="detail__icon d-flex">
                <img
                  style={{ width: 20 }}
                  src={`./img/drawer/destination.svg`}
                  alt=""
                />
              </div>
              <div className="detail__label form-label ml-5">Location</div>
            </div>
            <div
              onClick={(e) => e.stopPropagation()}
              className="box-header__arrow-bold cursor-inherit"
            >
              <img src="./img/drawer/down-arrow-bold.svg" alt="" />
            </div>
          </div>
        </div>
      ),
      children: (
        <DrawerFeatureRow>
          <>
            <div className="d-flex justify-between mb-5">
              <div className="form-label">Address</div>
              <Input
                value={carrierData.address || undefined}
                defaultValue={carrierData.address || undefined}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label">City</div>
              <Select
                size="small"
                showSearch
                optionFilterProp="children"
                filterOption={false}
                placeholder="Search city"
                defaultValue={locationData?.name}
                value={locationData?.name}
                onChange={handleChangeCity}
                onFocus={handleFocusCity}
                onSearch={handleSearchCity}
                style={{ width: 218 }}
                loading={isLoadingCities}
                notFoundContent={
                  isSelectCity || !searchCity ? null : isLoadingCities ? (
                    <Spin size="small" />
                  ) : (
                    'No such city'
                  )
                }
              >
                {(cities || []).map(
                  (d: {
                    id: number;
                    name: string;
                    zip: string;
                    state: { code: string };
                  }) => (
                    <Select.Option key={d.id} value={d.id} data={d}>
                      {
                        <HighlightedWord
                          value={d.name}
                          searchCity={searchCity}
                        />
                      }
                      {`, ${d.state.code}, ${d.zip}`}
                    </Select.Option>
                  ),
                )}
              </Select>
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label">State</div>
              <Input
                value={locationData?.state?.name}
                disabled
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label">Zip</div>
              <Select
                size="small"
                showSearch
                optionFilterProp="children"
                filterOption={false}
                placeholder="Search zip"
                defaultValue={locationData?.zip || undefined}
                value={locationData?.zip || undefined}
                onChange={handleChangeCity}
                onFocus={handleFocusCity}
                onSearch={handleSearchCity}
                style={{ width: 218 }}
                loading={isLoadingCities}
                notFoundContent={
                  isSelectCity || !searchCity ? null : isLoadingCities ? (
                    <Spin size="small" />
                  ) : (
                    'No such zip code'
                  )
                }
              >
                {(cities || []).map(
                  (d: {
                    id: number;
                    name: string;
                    zip: string;
                    state: { code: string };
                  }) => (
                    <Select.Option key={d.id} value={d.id} data={d}>
                      {`${d.name}, ${d.state.code}, `}
                      {
                        <HighlightedWord
                          value={d.zip}
                          searchCity={searchCity}
                        />
                      }
                    </Select.Option>
                  ),
                )}
              </Select>
            </div>
          </>
        </DrawerFeatureRow>
      ),
      showArrow: false,
      className: 'feature-drawer__item convert-modal__vehicle',
    },
  ];

  return (
    <Modal
      title="New Carrier"
      onCancel={closedModal}
      onSave={handleSave}
      width="small"
      padding="15"
      loading={isLoading}
      open={openModal}
    >
      <div className="carrier-modal">
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 21 }}>
              <img
                style={{ width: 20 }}
                src={`./img/drawer/company.svg`}
                alt=""
              />
            </div>
            <div className="form-label ml-5">Company</div>
          </div>
          <Input
            value={carrierData.name}
            defaultValue={carrierData.name}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <Collapse
          defaultActiveKey={['1']}
          ghost
          collapsible="header"
          expandIcon={DrawerArrowIcon}
          items={locationItems}
          className="convert-vehicle__inner carrier-modal-collapse"
        />
        <div className="d-flex justify-between mb-5">
          <div className="d-flex align-center">
            <div
              className="d-flex align-center"
              style={{ width: 18, height: 20 }}
            >
              <img src={`./img/drawer/company.svg`} alt="" />
            </div>
            <div className="form-label ml-5">MC number</div>
          </div>
          <Input
            value={carrierData.mcNumber}
            defaultValue={carrierData.mcNumber}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('mcNumber', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex align-center">
            <div
              className="d-flex align-center"
              style={{ width: 18, height: 20 }}
            >
              <img src={`./img/drawer/accounting.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Contact name</div>
          </div>
          <Input
            value={carrierData.contactName}
            defaultValue={carrierData.contactName}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('contactName', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 20 }}>
              <img src={`./img/drawer/phone-b.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Phone</div>
          </div>
          <Input
            value={carrierData.phone}
            defaultValue={carrierData.phone}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 20 }}>
              <img src={`./img/drawer/phone-b.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Phone #2</div>
          </div>
          <Input
            value={carrierData.phone2}
            defaultValue={carrierData.phone2}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('phone2', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between mb-5">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 20 }}>
              <img src={`./img/drawer/email-b.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Email</div>
          </div>
          <Input
            value={carrierData.email}
            defaultValue={carrierData.email}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="d-flex justify-between">
          <div className="d-flex">
            <div className="d-flex" style={{ width: 18, height: 20 }}>
              <img src={`./img/drawer/fax-b.svg`} alt="" />
            </div>
            <div className="form-label ml-5">Fax</div>
          </div>
          <Input
            value={carrierData.fax}
            defaultValue={carrierData.fax}
            size="small"
            style={{ width: 218, float: 'inline-end', height: 24 }}
            placeholder="Empty"
            onChange={(e) => handleChange('fax', e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}

export default CarrierModal;
