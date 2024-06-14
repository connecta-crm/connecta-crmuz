/* eslint-disable @typescript-eslint/no-unused-vars */
import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { getMenuData } from '../../services/menu';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DrawerProps, SourceType } from '../../ui/Drawer';
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
import { useOrderPostCD } from '../orders/useOrderPostCD';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../quotes/quoteSlice';
import { useConvertToQuote } from '../quotes/useConvertToQuote';
import { useUpdateUser } from '../users/useUpdateUser';
import { useUsers } from '../users/useUsers';
import { UsersTableDataType } from '../users/usersTableDataType';
import { FeatureData } from './feature-details/FeatDestinationInner';
import { getNextObjectId, getPreviousObjectId } from './useDrawerControl';

function DrawerHeader({
  dataSource,
  sourceType: feature,
  loadingItem,
  onOpenDrawer,
  onOpenDispatch,
  onOpenDirectDispatch,
  onOpenHistory,
  onOpenConvert,
}: DrawerProps & {
  sourceType: SourceType;
  onOpenHistory: (id: number) => void;
  onOpenConvert?: () => void;
}) {
  const { closeDrawer, isFullScreen, makeDrawerFull } = useDrawerFeature();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

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

  let featureData: FeatureData | undefined;

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
  const [isOpenSettings, setOpenSettings] = useState(false);
  const [statusType, setStatusType] = useState(leadData.status);
  const [isChangeStatus, setChangeStatus] = useState(false);

  const { users, isLoading: isLoadingUsers } = useUsers(isOpenSettings);
  const { update: updateUser, isLoading: isLoadingUpdateUser } =
    useUpdateUser();
  const { orderPostCD, updatedOrderPostCDData, isLoadingPostCD } =
    useOrderPostCD();

  const { onSaveFeature, isLoading, updatedOrderData } = useUpdateFeatureData({
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

  const handleMarkPickedUp = () => {
    dispatch(updateOrderField({ field: 'status', value: 'pickedup' }));
    setStatusUpdated(true);
  };

  const handleMarkCompleted = () => {
    dispatch(updateOrderField({ field: 'status', value: 'completed' }));
    setStatusUpdated(true);
  };

  const handleOnHold = () => {
    dispatch(updateOrderField({ field: 'status', value: 'onhold' }));
    setStatusUpdated(true);
  };

  const handleBackToOrder = () => {
    dispatch(updateOrderField({ field: 'status', value: 'orders' }));
    setStatusUpdated(true);
  };

  const handleRemoveCD = () => {
    dispatch(updateOrderField({ field: 'status', value: 'booked' }));
    setStatusUpdated(true);
  };

  const { convertToOrder, isLoadingConvertToOrder, isSuccessConvertToOrder } =
    useConvertToQuote();

  const handleConvertToOrder = () => {
    convertToOrder(quoteData.id);
  };

  const handlePostToCD = () => {
    if (feature === 'order') {
      orderPostCD(orderData.guid);
    }
  };

  useEffect(() => {
    if (!isLoadingConvertToOrder && isSuccessConvertToOrder) {
      closeDrawer();
    }
  }, [isLoadingConvertToOrder, isSuccessConvertToOrder]);

  useEffect(() => {
    if (isStatusUpdated) {
      onSaveFeature();
      setStatusUpdated(false);
    }
  }, [isStatusUpdated, statusType, onSaveFeature]);

  useEffect(() => {
    if (!isLoadingPostCD && updatedOrderPostCDData) {
      if (updatedOrderPostCDData.status === 'posted') {
        searchParams.set('status', 'posted');
        setSearchParams(searchParams);
        dispatch(updateOrderField({ field: 'status', value: 'posted' }));
        setChangeStatus(true);
      }
    }
  }, [isLoadingPostCD, updatedOrderPostCDData]);

  useEffect(() => {
    if (!isLoading && updatedOrderData) {
      const updatedOrderStatus = updatedOrderData?.status;
      switch (updatedOrderStatus) {
        case 'pickedup':
          searchParams.set('status', 'pickedup');
          break;
        case 'completed':
          searchParams.set('status', 'completed');
          break;
        case 'onhold':
          searchParams.set('status', 'onhold');
          break;
        case 'orders':
          searchParams.set('status', 'orders');
          break;
        default:
          closeDrawer();
          break;
      }
      setSearchParams(searchParams);
    }
  }, [isLoading, updatedOrderData]);

  useEffect(() => {
    if (isChangeStatus && status && updatedOrderPostCDData?.status !== status) {
      closeDrawer();
      setChangeStatus(false);
    }
  }, [status, isChangeStatus]);

  if (!featureData) {
    return;
  }
  // PREV-NEXT functions
  const handlePrevElement = () => {
    const previousLeadGuid = getPreviousObjectId(dataSource, featureData.guid);
    onOpenDrawer?.(previousLeadGuid);
  };
  const handleNextElement = () => {
    const nextLeadId = getNextObjectId(dataSource, featureData.guid);
    onOpenDrawer?.(nextLeadId);
  };

  const orderStatusName = () => {
    if (pathname !== '/orders') return;

    return getMenuData
      .find((menu) => menu.path === pathname)
      ?.status?.find((statusObj) => statusObj.value === status)?.title;
  };

  const handleChangeUserActivity = (
    user: UsersTableDataType,
    isActive: boolean,
  ) => {
    updateUser({ ...user, isActive });
  };

  const itemsSettingMore: MenuProps['items'] = [
    ...(feature === 'lead'
      ? [
          {
            label: <p onClick={() => onOpenHistory(featureData.id)}>History</p>,
            key: '0',
          },
        ]
      : []),
    ...(feature === 'quote'
      ? [
          {
            label: <p onClick={() => onOpenHistory(featureData.id)}>History</p>,
            key: '0',
          },
        ]
      : []),
    ...(feature === 'order'
      ? [
          {
            label: <p onClick={() => onOpenHistory(featureData.id)}>History</p>,
            key: '0',
          },
          {
            label: <p onClick={() => {}}>Back To Quotes</p>,
            key: '1',
          },
          {
            label: <p onClick={onOpenDirectDispatch}>Direct Dispatch</p>,
            key: '3',
          },
          {
            label: (
              <button
                className="bg-transparent w-full text-left"
                disabled={isLoading}
                onClick={handleOnHold}
              >
                On hold
              </button>
            ),
            key: '50',
          },
          {
            label: <p onClick={() => {}}>Team Support</p>,
            key: '4',
          },
          { type: 'divider' as const },
          ...((users || []).filter((f: { isActive: boolean }) => !f?.isActive)
            ? [
                {
                  label: <small className="pb-0 pt-0">Available to add</small>,
                  key: '4-01',
                  type: 'group',
                  children: (users || [])
                    .filter((f: { isActive: boolean }) => !f?.isActive)
                    .map((user: UsersTableDataType) => ({
                      key: '4-' + user.id,
                      label: (
                        <button
                          style={{ background: 'none' }}
                          disabled={isLoadingUpdateUser}
                          onClick={() => handleChangeUserActivity(user, true)}
                        >
                          {user.firstName + ' ' + user.lastName}
                        </button>
                      ),
                    })),
                },
              ]
            : []),
          ...((users || []).filter((f: { isActive: boolean }) => f?.isActive)
            ? [
                {
                  label: <small className="pb-0 pt-0">Included</small>,
                  key: '4-02',
                  type: 'group',
                  children: (users || [])
                    .filter((f: { isActive: boolean }) => f?.isActive)
                    .map((user: UsersTableDataType) => ({
                      key: '40-' + user.id,
                      label: (
                        <button
                          style={{ background: 'none' }}
                          disabled={isLoadingUpdateUser}
                          onClick={() => handleChangeUserActivity(user, false)}
                        >
                          {user.firstName + ' ' + user.lastName}
                        </button>
                      ),
                    })),
                },
              ]
            : []),
        ]
      : []),
    ...(feature === 'order' && status !== 'dispatched'
      ? [
          { type: 'divider' as const },
          {
            label: <p onClick={() => {}}>Cancel the order</p>,
            key: '5',
          },
        ]
      : []),
  ];

  // DROPDOWN FUNCTION
  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenSettings(nextOpen);
    }
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
                <Button
                  className=""
                  type="primary"
                  onClick={onOpenConvert}
                  disabled={isLoadingConvertToOrder}
                >
                  Convert to order
                </Button>
              )}
              {feature === 'order' && (
                <Button
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
                      onClick={onOpenDispatch}
                    >
                      Dispatch
                    </Button>
                    <Button
                      onClick={handlePostToCD}
                      disabled={isLoadingPostCD}
                      className="ml-10"
                      type="primary"
                      ghost
                    >
                      Repost to CD
                    </Button>
                  </>
                ) : status === 'orders' || status === 'booked' ? (
                  <Button
                    className="ml-10"
                    type="primary"
                    onClick={handlePostToCD}
                    disabled={isLoadingPostCD}
                  >
                    {isLoadingPostCD ? (
                      <>
                        <span>
                          Post to CD <LoadingOutlined />
                        </span>
                      </>
                    ) : (
                      'Post to CD'
                    )}
                  </Button>
                ) : null)}

              {(feature === 'lead' || feature === 'quote') && (
                <Button
                  className="ml-10 mr-10"
                  type="primary"
                  danger
                  disabled={isLoading}
                  onClick={handleArchive}
                >
                  {featureData.status === 'archived'
                    ? 'Back to Leads'
                    : 'Archive'}
                </Button>
              )}

              {feature === 'order' &&
                ['issue', 'onhold', 'archived'].includes(status) && (
                  <Button
                    className="ml-10"
                    type="primary"
                    onClick={handleBackToOrder}
                    disabled={isLoading}
                  >
                    Back to Order
                  </Button>
                )}
              {feature === 'order' &&
                ['orders', 'booked', 'issue', 'onhold'].includes(status) && (
                  <Button
                    className="ml-10 mr-10"
                    type="primary"
                    danger
                    onClick={handleArchive}
                    disabled={isLoading}
                  >
                    Archive
                  </Button>
                )}

              {feature === 'order' && status === 'posted' && (
                <Button
                  className="ml-10 mr-10"
                  type="primary"
                  danger
                  onClick={handleRemoveCD}
                  disabled={isLoading}
                >
                  Remove from CD
                </Button>
              )}

              {feature === 'order' && status === 'dispatched' && (
                <Button
                  className="ml-10"
                  type="primary"
                  onClick={handleMarkPickedUp}
                  disabled={isLoading}
                >
                  Mark as Picked up
                </Button>
              )}
              {feature === 'order' && status === 'pickedup' && (
                <Button
                  className="ml-10"
                  type="primary"
                  onClick={handleMarkCompleted}
                  disabled={isLoading}
                >
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
            {/* SETTING MORE */}
            <Dropdown
              menu={{
                items: itemsSettingMore,
                selectable: false,
                defaultSelectedKeys: [''],
              }}
              trigger={['click']}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              open={isOpenSettings}
              destroyPopupOnHide={true}
              onOpenChange={handleOpenChange}
              className="drawer-header__settings"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <div className="drawer-header__more">
                    <img src="./img/drawer/more.svg" alt="" />
                  </div>
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerHeader;
