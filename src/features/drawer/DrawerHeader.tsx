/* eslint-disable @typescript-eslint/no-unused-vars */
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { getMenuData } from '../../services/menu';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DrawerProps } from '../../ui/Drawer';
import { classNames } from '../../utils/helpers';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../leads/leadSlice';
import { useUpdateFeatureData } from '../leads/useUpdateFeatureData';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../orders/orderSlice';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../quotes/quoteSlice';
import { getNextObjectId, getPreviousObjectId } from './useDrawerControl';

function DrawerHeader({
  dataSource,
  sourceType: feature,
  loadingItem,
  onOpenDrawer,
  onOpenCarrier,
}: DrawerProps) {
  const { closeDrawer, isFullScreen, makeDrawerFull } = useDrawerFeature();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const status = searchParams.get('status') || 'orders';

  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

  let featureData;

  switch (feature) {
    case 'lead':
      featureData = leadData;
      break;
    case 'quote':
      featureData = quoteData;
      break;
    case 'order':
      featureData = orderData;
      break;
    default:
      break;
  }

  const dispatch = useAppDispatch();

  const [isDataUpdated, setDataUpdated] = useState(false);
  const [isStatusUpdated, setStatusUpdated] = useState(false);
  const [statusType, setStatusType] = useState(leadData.status);

  const { onSaveFeature, isLoading } = useUpdateFeatureData({
    keyValue: '',
    feature,
    field: 'status',
    isDataUpdated,
    setDataUpdated,
  });

  const handleArchive = () => {
    const value = statusType === 'leads' ? 'archived' : 'leads';
    setStatusType(value);
    switch (feature) {
      case 'lead':
        dispatch(updateLeadField({ field: 'status', value }));
        break;
      case 'quote':
        dispatch(updateQuoteField({ field: 'status', value }));
        break;
      case 'order':
        dispatch(updateOrderField({ field: 'status', value }));
        break;
      default:
        break;
    }

    setStatusUpdated(true);
  };

  useEffect(() => {
    if (isStatusUpdated) {
      onSaveFeature();
      setStatusUpdated(false);
    }
  }, [isStatusUpdated, statusType, onSaveFeature]);

  if (!featureData) {
    return;
  }
  // PREV-NEXT functions
  const handlePrevElement = () => {
    const previousLeadGuid = getPreviousObjectId(dataSource, featureData.guid);
    onOpenDrawer(previousLeadGuid);
  };
  const handleNextElement = () => {
    const nextLeadId = getNextObjectId(dataSource, featureData.guid);
    onOpenDrawer(nextLeadId);
  };

  const orderStatusName = () => {
    if (pathname !== '/orders') return;

    return getMenuData
      .find((menu) => menu.path === pathname)
      ?.status?.find((statusObj) => statusObj.value === status)?.title;
  };

  return (
    <div className="drawer-header">
      <div className="drawer-header__container">
        <div className="drawer-header__left control">
          {isFullScreen && (
            <>
              <div
                onClick={closeDrawer}
                className="control__item control__item_close"
              >
                <img src="./img/drawer/close-x.svg" alt="" />
              </div>
              <button
                title="prev-element"
                className="control__item control__item_up-arrow"
                disabled={loadingItem || isLoading}
                onClick={handlePrevElement}
              >
                <img src="./img/drawer/up-arrow.svg" alt="" />
              </button>
              <button
                title="next-element"
                className="control__item control__item_down-arrow"
                disabled={loadingItem || isLoading}
                onClick={handleNextElement}
              >
                <img src="./img/drawer/down-arrow.svg" alt="" />
              </button>
              <div
                onClick={() => makeDrawerFull(false)}
                className="control__item control__item_size"
              >
                <img src="./img/drawer/resize.svg" alt="" />
              </div>
            </>
          )}
          <div
            className={classNames(
              isFullScreen ? 'ml-20' : '',
              'd-flex flex-column',
            )}
          >
            <div className="d-flex">
              <div className="drawer-header__id id_1">#100{featureData.id}</div>
              <div className="drawer-header__username">
                {featureData.customerName || '-'}
              </div>
            </div>
            <div className="drawer-header__id id_2 d-none">
              PD: #110004, #110006
            </div>
          </div>
        </div>
        <div className="drawer-header__right">
          <div className="drawer-header__actions">
            {feature === 'quote' && (
              <div className="drawer-header__btnitem">
                <Dropdown menu={menuProps} trigger={['click']}>
                  <Button>
                    <Space>
                      12 days old
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            )}
            <div className="drawer-header__btnitem __avatar">
              <img
                src="./img/drawer/avatar.png"
                alt="Ali Brian"
                className="avatar mr-10"
              />
              <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span className="user-name">Ali Brian</span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>

            {feature === 'quote' && (
              <div className="drawer-header__btnitem">
                <Dropdown menu={menuProps} trigger={['click']}>
                  <Button>
                    <Space>
                      Upcoming
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            )}
            <div className="drawer-header__btnitem ">
              {feature === 'quote' && (
                <Button className="" type="primary">
                  Convert to order
                </Button>
              )}

              {feature === 'order' && (
                <Button
                  className=""
                  style={{
                    backgroundColor: 'rgba(221, 242, 253, 1)',
                    cursor: 'initial',
                  }}
                  type="text"
                >
                  {orderStatusName()}
                </Button>
              )}
              {feature === 'order' &&
                (status === 'posted' ? ( // posted
                  <>
                    <Button
                      className="ml-10"
                      type="primary"
                      onClick={onOpenCarrier}
                    >
                      Dispatch
                    </Button>
                    <Button className="ml-10" type="primary" ghost>
                      Repost to CD
                    </Button>
                  </>
                ) : status === 'orders' || status === 'booked' ? (
                  <Button className="ml-10" type="primary">
                    Post to CD
                  </Button>
                ) : null)}

              {(feature === 'lead' || feature === 'quote') && (
                <Button
                  onClick={handleArchive}
                  className="ml-10 mr-10"
                  type="primary"
                  danger
                >
                  {featureData.status === 'archived'
                    ? 'Back to Leads'
                    : 'Archive'}
                </Button>
              )}

              {feature === 'order' &&
                (status === 'issue' ||
                  status === 'onhold' ||
                  status === 'archived') && (
                  <Button className="ml-10" type="primary">
                    Back to Order
                  </Button>
                )}
              {feature === 'order' &&
                ['orders', 'booked', 'issue', 'onhold'].includes(status) && (
                  <Button
                    onClick={handleArchive}
                    className="ml-10 mr-10"
                    type="primary"
                    danger
                  >
                    {featureData.status === 'archived'
                      ? 'Back to Order'
                      : 'Archive'}
                  </Button>
                )}

              {feature === 'order' && status === 'posted' && (
                <Button className="ml-10 mr-10" type="primary" danger>
                  Remove from CD
                </Button>
              )}

              {feature === 'order' && status === 'dispatched' && (
                <Button className="ml-10" type="primary">
                  Mark as Picked up
                </Button>
              )}
              {feature === 'order' && status === 'pickedup' && (
                <Button className="ml-10" type="primary">
                  Mark as Delivered
                </Button>
              )}
              {feature === 'order' && status === 'completed' && (
                <Button className="ml-10" type="primary">
                  ⭐️⭐️⭐️⭐️⭐️
                </Button>
              )}
            </div>
            {feature === 'quote' && (
              <div className="drawer-header__btnitem ml-0">
                <Dropdown menu={menuProps} trigger={['click']}>
                  <Button>
                    <Space>
                      Team support
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            )}
            <div className="drawer-header__more">
              <img src="./img/drawer/more.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerHeader;
