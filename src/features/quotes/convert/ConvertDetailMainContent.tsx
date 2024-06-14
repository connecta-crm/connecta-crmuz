/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collapse, CollapseProps, Input, Select, Spin } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import HighlightedWord from '../../../ui/HighlightedWord';
import {
  CONDITION_TYPES,
  LOCATION_TYPES,
  TRAILER_TYPES,
} from '../../../utils/constants';
import { useCities } from '../../address/useCities';
import DrawerArrowIcon from '../../drawer/DrawerArrowIcon';
import DrawerFeatureRow from '../../drawer/DrawerFeatureRow';
import FeatItemLabel from '../../drawer/feature-details/FeatItemLabel';
import { useProviders } from '../../providers/useProviders';
import {
  fetchQuoteConvertData,
  getQuoteConvertData,
  updateConvertField,
} from '../quoteConvertSlice';
import ConvertVehicleItems from './ConvertVehicleItems';

function ConvertDetailMainContent() {
  const quoteConvertData = useAppSelector(getQuoteConvertData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuoteConvertData());
  }, [dispatch]);

  const handleChange = (field: string, value: string) => {
    dispatch(updateConvertField({ field, value }));
  };

  const [isSelectCity, setSelectCity] = useState(true);
  const [searchCity, setSearchCity] = useState<string | null>(null);
  const [select, setSelect] = useState(false);

  const { cities, isLoading: isLoadingCities } = useCities(searchCity);
  const { providers, isFetching: isLoadingProviders } = useProviders(select);

  // CITY
  const handleFocusCity = () => {
    setSelectCity(true);
  };

  const handleSearchCity = (value: string) => {
    setSelectCity(false);
    setSearchCity(value);
  };

  const handleChangeCity = (_: number | string, option: DefaultOptionType) => {
    dispatch(updateConvertField({ field: 'origin', value: option?.data }));
  };

  const itemsForOriginDestination: CollapseProps['items'] = [
    {
      key: '120',
      label: (
        <div className="detail detail-origin detail-convert">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Origin" icon="origin" />
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
              <div className="form-label required-label">Pickup address</div>
              <Input
                value={quoteConvertData.originAddress || undefined}
                defaultValue={quoteConvertData.originAddress || undefined}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) => handleChange('originAddress', e.target.value)}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Pickup city</div>
              <Select
                size="small"
                showSearch
                optionFilterProp="children"
                filterOption={false}
                placeholder="Search city"
                defaultValue={quoteConvertData.origin.name}
                value={quoteConvertData.origin.name}
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
              <div className="form-label required-label">Pickup state</div>
              <Input
                value={quoteConvertData.origin?.state?.name}
                disabled
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Pickup zip</div>
              <Select
                size="small"
                showSearch
                optionFilterProp="children"
                filterOption={false}
                placeholder="Search zip"
                defaultValue={quoteConvertData.origin?.zip}
                value={quoteConvertData.origin.zip}
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

            <div className="d-flex justify-between mb-5">
              <div className="form-label">Business name</div>
              <Input
                value={quoteConvertData.originBusinessName || undefined}
                defaultValue={quoteConvertData.originBusinessName || undefined}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('originBusinessName', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label">Business phone</div>
              <Input
                value={quoteConvertData.originBusinessPhone}
                defaultValue={quoteConvertData.originBusinessPhone}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('originBusinessPhone', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Contact person</div>
              <Input
                value={quoteConvertData.originContactPerson}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('originContactPerson', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex justify-between">
                <div className="form-label mr-5 required-label">Phone</div>
                <Input
                  value={quoteConvertData.originPhone}
                  defaultValue={quoteConvertData.originPhone}
                  style={{ width: 115, float: 'inline-end', height: 24 }}
                  onChange={(e) => handleChange('originPhone', e.target.value)}
                />
              </div>
              <div className="d-flex justify-between ">
                <div className="form-label mr-5 pl-0">Second</div>
                <Input
                  value={quoteConvertData.originSecondPhone}
                  defaultValue={quoteConvertData.originSecondPhone}
                  style={{ width: 115, float: 'inline-end', height: 24 }}
                  onChange={(e) =>
                    handleChange('originSecondPhone', e.target.value)
                  }
                />
              </div>
            </div>
            <div className="d-flex justify-between ">
              <div className="form-label required-label">Buyer number</div>
              <Input
                value={quoteConvertData.originBuyerNumber}
                defaultValue={quoteConvertData.originBuyerNumber}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('originBuyerNumber', e.target.value)
                }
              />
            </div>
          </>
        </DrawerFeatureRow>
      ),
      showArrow: false,
    },
    {
      key: '121',
      label: (
        <div className="detail detail-origin detail-convert">
          <div className="detail__header d-flex align-center justify-between">
            <FeatItemLabel label="Destination" icon="destination" />
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
          <div className="mb-20">
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Delivery address</div>
              <Input
                value={quoteConvertData.destinationAddress || undefined}
                defaultValue={quoteConvertData.destinationAddress || undefined}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('destinationAddress', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Delivery city</div>
              <Select
                showSearch
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                size="small"
                optionFilterProp="children"
                placeholder="Search city"
                defaultValue={quoteConvertData.destination?.name}
                value={quoteConvertData.destination?.name}
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
              <div className="form-label required-label">Delivery state</div>
              <Input
                value={quoteConvertData.destination?.state?.name}
                disabled
                style={{ width: 218, float: 'inline-end', height: 24 }}
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Delivery zip</div>
              <Select
                size="small"
                showSearch
                optionFilterProp="children"
                filterOption={false}
                placeholder="Search zip"
                defaultValue={quoteConvertData.destination?.zip}
                value={quoteConvertData.destination?.zip}
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
            <div className="d-flex justify-between mb-5">
              <div className="form-label">Business name</div>
              <Input
                value={quoteConvertData.destinationBusinessName}
                defaultValue={quoteConvertData.destinationBusinessName}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('destinationBusinessName', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label">Business phone</div>
              <Input
                value={quoteConvertData.destinationBusinessPhone}
                defaultValue={quoteConvertData.destinationBusinessPhone}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('destinationBusinessPhone', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="form-label required-label">Contact person</div>
              <Input
                value={quoteConvertData.destinationContactPerson}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) =>
                  handleChange('destinationContactPerson', e.target.value)
                }
              />
            </div>
            <div className="d-flex justify-between mb-5">
              <div className="d-flex justify-between">
                <div className="form-label mr-5 required-label">Phone</div>
                <Input
                  value={quoteConvertData.destinationPhone}
                  defaultValue={quoteConvertData.destinationPhone}
                  style={{ width: 115, float: 'inline-end', height: 24 }}
                  onChange={(e) =>
                    handleChange('destinationPhone', e.target.value)
                  }
                />
              </div>
              <div className="d-flex justify-between ">
                <div className="form-label mr-5 pl-0">Second</div>
                <Input
                  value={quoteConvertData.destinationSecondPhone}
                  defaultValue={quoteConvertData.destinationSecondPhone}
                  style={{ width: 115, float: 'inline-end', height: 24 }}
                  onChange={(e) =>
                    handleChange('destinationSecondPhone', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="mb-20">
            <div className="d-flex align-center justify-between mb-5">
              <FeatItemLabel icon="origin" label="Location Type" />
              <Select
                value={quoteConvertData.locationType}
                defaultValue={quoteConvertData.locationType}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) => handleChange('locationType', e)}
                options={LOCATION_TYPES}
              />
            </div>
            <div className="d-flex align-center justify-between mb-5">
              <FeatItemLabel icon="trailer" label="Trailer Type" />
              <Select
                value={quoteConvertData.trailerType}
                defaultValue={quoteConvertData.trailerType}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) => handleChange('trailerType', e)}
                options={TRAILER_TYPES}
              />
            </div>
            <div className="d-flex align-center justify-between mb-5">
              <FeatItemLabel icon="trailer" label="Source" />
              <Select
                size="small"
                filterOption={false}
                placeholder="Search city"
                defaultValue={quoteConvertData.source}
                value={quoteConvertData.source}
                onChange={(e) => handleChange('source', e)}
                onFocus={() => setSelect(true)}
                style={{ width: 218 }}
                loading={isLoadingProviders}
                notFoundContent={
                  isLoadingProviders ? <Spin size="small" /> : 'No such source'
                }
                options={(providers || []).map(
                  (d: { id: number; name: string }) => ({
                    value: d.id,
                    data: d,
                    label: d.name,
                  }),
                )}
              />
            </div>
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="form-label pl-0 mr-5">CD note</div>
            <Input
              value={quoteConvertData.cdNote}
              style={{ width: 258, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChange('cdNote', e.target.value)}
            />
          </div>
          <div className="d-flex justify-between mb-5">
            <div className="form-label pl-0 mr-5">CM note</div>
            <Input
              value={quoteConvertData.cmNote}
              style={{ width: 258, float: 'inline-end', height: 24 }}
              onChange={(e) => handleChange('cmNote', e.target.value)}
            />
          </div>
        </DrawerFeatureRow>
      ),
      showArrow: false,
      className: 'mb-10',
    },
  ];

  const itemsForDetailsMain: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="box-header d-flex align-center justify-between">
          <span className="box-header__label">Details</span>
        </div>
      ),
      children: (
        <>
          <ConvertVehicleItems />
          <div style={{ padding: '0 16px' }}>
            <div className="d-flex align-center justify-between mb-5 mt-5">
              <FeatItemLabel icon="dvigatel" label="Condition" />
              <Select
                value={quoteConvertData.condition}
                defaultValue={quoteConvertData.condition}
                style={{ width: 218, float: 'inline-end', height: 24 }}
                onChange={(e) => handleChange('condition', e)}
                options={CONDITION_TYPES}
              />
            </div>
          </div>
          <Collapse
            ghost
            collapsible="header"
            defaultActiveKey={['1', '20', '120', '121', '122']}
            expandIcon={DrawerArrowIcon}
            items={itemsForOriginDestination}
            className="convert-vehicle__inner"
          />
        </>
      ),
      className: 'feature-drawer__item convert-modal__vehicle',
    },
  ];
  return (
    <Collapse
      ghost
      collapsible="header"
      defaultActiveKey={['1']}
      expandIcon={DrawerArrowIcon}
      items={itemsForDetailsMain}
    />
  );
}

export default ConvertDetailMainContent;
