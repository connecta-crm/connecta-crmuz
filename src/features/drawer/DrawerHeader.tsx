/* eslint-disable @typescript-eslint/no-unused-vars */
import { CaretDownOutlined, LoadingOutlined } from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Button, Dropdown, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { getMenuData } from '../../services/menu';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DrawerProps, SourceType } from '../../ui/Drawer';
import Modal from '../../ui/Modal';
import {
  LEAD_ARCHIVE_REASONS,
  ORDER_ARCHIVE_REASONS,
  QUOTE_ARCHIVE_REASONS,
  REASSIGN_USERS_REASONS,
} from '../../utils/constants';
import { classNames } from '../../utils/helpers';
import {
  getLeadData,
  updateField as updateLeadField,
} from '../leads/leadSlice';
import { useLeadArchive } from '../leads/useLeadArchive';
import { useUpdateFeatureData } from '../leads/useUpdateFeatureData';
import {
  getOrderData,
  updateField as updateOrderField,
} from '../orders/orderSlice';
import { useOrderArchive } from '../orders/useOrderArchive';
import { useOrderPostCD } from '../orders/useOrderPostCD';
import { useOrderReassignUser } from '../orders/useOrderReassignUser';
import {
  getQuoteData,
  updateField as updateQuoteField,
} from '../quotes/quoteSlice';
import { useLeadReassignUser } from '../quotes/useLeadReassignUser';
import { useQuoteArchive } from '../quotes/useQuoteArchive';
import { useQuoteReassignUser } from '../quotes/useQuoteReassignUser';
import { useUpdateUser } from '../users/useUpdateUser';
import { useUsers } from '../users/useUsers';
import { UsersTableDataType } from '../users/usersTableDataType';
import { FeatureData } from './feature-details/FeatDestinationInner';
import { getNextObjectId, getPreviousObjectId } from './useDrawerControl';

function DrawerHeader({
  dataSource,
  sourceType: feature,
  loadingItem,
  isLoadingHistory,
  onOpenDrawer,
  onOpenDispatch,
  onOpenDirectDispatch,
  onOpenHistory,
  onOpenConvert,
}: DrawerProps & {
  sourceType: SourceType;
  isLoadingHistory: boolean;
  onOpenHistory: (id: number) => void;
  onOpenConvert?: () => void;
}) {
  const { closeDrawer, isFullScreen, makeDrawerFull, onChangeInnerCollapse } =
    useDrawerFeature();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status') || 'orders';

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };

  const leadData = useAppSelector(getLeadData);
  const quoteData = useAppSelector(getQuoteData);
  const orderData = useAppSelector(getOrderData);

  const {
    orderReassignUser,
    isLoadingReassign: isLoadingReassign1,
    isSuccessReassignUser: isSuccessReassignUser1,
  } = useOrderReassignUser();

  const {
    quoteReassignUser,
    isLoadingReassign: isLoadingReassign2,
    isSuccessReassignUser: isSuccessReassignUser2,
  } = useQuoteReassignUser();

  const {
    leadReassignUser,
    isLoadingReassign: isLoadingReassign3,
    isSuccessReassignUser: isSuccessReassignUser3,
  } = useLeadReassignUser();

  const {
    leadArchive,
    isLoadingArchive: isLoadingArchive3,
    isSuccessArchive: isSuccessArchive3,
  } = useLeadArchive();
  const {
    quoteArchive,
    isLoadingArchive: isLoadingArchive2,
    isSuccessArchive: isSuccessArchive2,
  } = useQuoteArchive();
  const {
    orderArchive,
    isLoadingArchive: isLoadingArchive1,
    isSuccessArchive: isSuccessArchive1,
  } = useOrderArchive();

  let featureData: FeatureData | undefined,
    isLoadingReassign: boolean = false,
    isSuccessReassignUser: boolean = false,
    isSuccessArchive: boolean = false,
    isLoadingArchive: boolean = false;

  switch (feature) {
    case 'lead':
      featureData = leadData;
      isLoadingReassign = isLoadingReassign3;
      isSuccessReassignUser = isSuccessReassignUser3;
      isLoadingArchive = isLoadingArchive3;
      isSuccessArchive = isSuccessArchive3;
      break;
    case 'quote':
      featureData = quoteData;
      isLoadingReassign = isLoadingReassign2;
      isSuccessReassignUser = isSuccessReassignUser2;
      isLoadingArchive = isLoadingArchive2;
      isSuccessArchive = isSuccessArchive2;
      break;
    case 'order':
      featureData = orderData;
      isLoadingReassign = isLoadingReassign1;
      isSuccessReassignUser = isSuccessReassignUser1;
      isLoadingArchive = isLoadingArchive1;
      isSuccessArchive = isSuccessArchive1;
      break;
    default:
      break;
  }

  const dispatch = useAppDispatch();

  const [isDataUpdated, setDataUpdated] = useState(false);
  const [isStatusUpdated, setStatusUpdated] = useState(false);
  const [isOpenSettings, setOpenSettings] = useState(false);
  const [isOpenTeamSupport, setOpenTeamSupport] = useState(false);
  const [isOpenUsers, setOpenUsers] = useState(false);
  // const [statusType, setStatusType] = useState(featureData?.status);
  const [isChangeStatus, setChangeStatus] = useState(false);
  const [isOpenArchiveModal, setOpenArchiveModal] = useState(false);
  const [isOpenReassignModal, setOpenReassignModal] = useState(false);
  const [reassignUserId, setReassignUserId] = useState(0);
  const [archieveReason, setArchiveReason] = useState('');
  const [reassignReason, setReassignReason] = useState('');
  const [showUsers, setShowUsers] = useState(false);
  const [isPostCDTypeAction, setPostCDTypeAction] = useState('');

  const {
    users,
    isLoading: isLoadingUsers,
    isFetchingUsers,
  } = useUsers(isOpenSettings || isOpenUsers || isOpenTeamSupport);
  const { update: updateUser, isLoading: isLoadingUpdateUser } =
    useUpdateUser();
  const { orderPostCD, updatedOrderPostCDData, isLoadingPostCD } =
    useOrderPostCD();

  const { onSaveFeature, isLoading, updatedOrderData, updatedQuoteData } =
    useUpdateFeatureData({
      keyValue: '',
      feature,
      field: 'status',
      isDataUpdated,
      setDataUpdated,
    });

  const handleArchive = () => {
    switch (feature) {
      case 'lead':
        leadArchive({ guid: featureData?.guid || '', reason: archieveReason });
        break;
      case 'quote':
        quoteArchive({ guid: featureData?.guid || '', reason: archieveReason });
        break;
      case 'order':
        orderArchive({ guid: featureData?.guid || '', reason: archieveReason });
        break;
      default:
        throw new Error('Something went wrong in archiving');
    }
  };

  const handleReassign = () => {
    switch (feature) {
      case 'lead':
        leadReassignUser({
          guid: featureData?.guid || '',
          model: { user: reassignUserId, reason: reassignReason },
        });
        break;
      case 'quote':
        quoteReassignUser({
          guid: featureData?.guid || '',
          model: { user: reassignUserId, reason: reassignReason },
        });
        break;
      case 'order':
        orderReassignUser({
          guid: featureData?.guid || '',
          model: { user: reassignUserId, reason: reassignReason },
        });
        break;
      default:
        throw new Error('Something went wrong in reassigning');
    }
  };

  useEffect(() => {
    if (!isLoadingReassign && isSuccessReassignUser) {
      setOpenReassignModal(false);
    }
  }, [isLoadingReassign, isSuccessReassignUser]);

  useEffect(() => {
    if (
      !isLoadingArchive &&
      isSuccessArchive
      // featureData?.status !== status
    ) {
      setOpenArchiveModal(false);
      console.log('closeDrawer 2');
      closeDrawer();
    }
  }, [isLoadingArchive, isSuccessArchive]);

  // QUOTE STATUS FEATURES
  useEffect(() => {
    if (isStatusUpdated) {
      onSaveFeature();
      setStatusUpdated(false);
      console.log('onSaveFeature QQ');
    }
  }, [isStatusUpdated, onSaveFeature]);

  useEffect(() => {
    if (!isLoading && updatedQuoteData) {
      const value = updatedQuoteData?.status;
      console.log('up Status', value);
      if (value) {
        searchParams.set('status', value);
        setSearchParams(searchParams);
        dispatch(updateQuoteField({ field: 'status', value }));
      }
    }
  }, [isLoading, updatedQuoteData]);

  // ORDER POST to CD
  useEffect(() => {
    if (!isLoadingPostCD && updatedOrderPostCDData) {
      if (updatedOrderPostCDData.status === 'posted') {
        searchParams.set('status', 'posted');
        setSearchParams(searchParams);
        dispatch(updateOrderField({ field: 'status', value: 'posted' }));
        setChangeStatus(true);
      }
      if (updatedOrderPostCDData.status === 'booked') {
        searchParams.set('status', 'booked');
        setSearchParams(searchParams);
        dispatch(updateOrderField({ field: 'status', value: 'booked' }));
        setChangeStatus(true);
      }
      setPostCDTypeAction('');
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
      console.log('closeDrawer 1');
      closeDrawer();
      setChangeStatus(false);
    }
  }, [status, isChangeStatus]);

  if (!featureData) {
    return;
  }

  const { extraUser } = featureData || {};

  console.log('featureData', featureData);

  // PREV-NEXT functions
  const handlePrevElement = () => {
    onChangeInnerCollapse([]);
    const previousLeadGuid = getPreviousObjectId(dataSource, featureData.guid);
    onOpenDrawer?.(previousLeadGuid);
  };
  const handleNextElement = () => {
    onChangeInnerCollapse([]);
    const nextLeadId = getNextObjectId(dataSource, featureData.guid);
    onOpenDrawer?.(nextLeadId);
  };
  const featureStatusName = () => {
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

  const itemsSettingMore = [
    ...(['lead', 'quote', 'order'].includes(feature)
      ? [
          {
            label: (
              <p
                className="d-flex justify-between"
                onClick={() => onOpenHistory(featureData.id)}
              >
                <span>History</span>
                {isLoadingHistory && <LoadingOutlined />}
              </p>
            ),
            key: '0',
          },
        ]
      : []),
    ...(feature === 'order'
      ? [
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
                onClick={() => {
                  dispatch(
                    updateOrderField({ field: 'status', value: 'onhold' }),
                  );
                  setStatusUpdated(true);
                }}
              >
                On hold
              </button>
            ),
            key: '50',
          },
          {
            label: (
              <div onClick={() => setShowUsers(!showUsers)}>
                <p className="d-flex align-center justify-between">
                  <span>Team support</span>
                  <CaretDownOutlined size={12} />
                </p>
              </div>
            ),
            key: '4',
          },
          ...(showUsers ? [{ type: 'divider' as const }] : []),
          ...((users || []).filter(
            (f: { isActive: boolean }) => !f?.isActive,
          ) && showUsers
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
                          style={{
                            background: 'none',
                            maxWidth: '100%',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
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
          ...((users || []).filter((f: { isActive: boolean }) => f?.isActive) &&
          showUsers
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

  const itemsTeamSupports = [
    {
      label: <p>Add a user for support</p>,
    },
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
                    onClick={() => handleChangeUserActivity(user, false)}
                  >
                    {user.firstName + ' ' + user.lastName}
                  </button>
                ),
              })),
          },
        ]
      : []),
  ];

  // USERS ITEMS
  const itemsUsers = [
    {
      label: <small className="pb-0 pt-0">Current owner</small>,
      key: '4-01',
      type: 'group',
      children: [
        {
          key: '4-100',
          label: (
            <p style={{ background: 'none', paddingBottom: 5 }}>
              {extraUser?.firstName + ' ' + extraUser?.lastName}
            </p>
          ),
        },
      ],
    },
    ...((users || []).filter((f: { isActive: boolean }) => f?.isActive)
      ? [
          {
            label: (
              <small className="pb-0 pt-0">Available users to re-assign</small>
            ),
            key: '4-02',
            type: 'group',
            children: (users || [])
              .filter((f: { isActive: boolean }) => f?.isActive)
              .map((user: UsersTableDataType) =>
                user.id !== extraUser?.id
                  ? {
                      key: '40-' + user.id,
                      label: (
                        <button
                          style={{ background: 'none' }}
                          disabled={isLoadingUpdateUser}
                          onClick={() => {
                            setReassignUserId(user.id);
                            setOpenReassignModal(true);
                          }}
                        >
                          {user.firstName + ' ' + user.lastName}
                        </button>
                      ),
                    }
                  : null,
              ),
          },
        ]
      : []),
  ];

  // UPCOMING ITEMS
  type UpcomingStatusType = {
    id: number;
    value: string;
    title: string;
  };
  const itemsUpcoming =
    getMenuData[1].status?.map(
      ({ id: key, title, value }: UpcomingStatusType) => {
        return {
          key,
          label: (
            <p
              onClick={() => {
                dispatch(updateQuoteField({ field: 'status', value }));
                setStatusUpdated(true);
              }}
            >
              {title}
            </p>
          ),
        };
      },
    ) || [];

  // DROPDOWN FUNCTION
  const handleOpenSettings: DropdownProps['onOpenChange'] = (
    nextOpen,
    info,
  ) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenSettings(nextOpen);
    }
  };

  const handleOpenTeamSupport: DropdownProps['onOpenChange'] = (
    nextOpen,
    info,
  ) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenTeamSupport(nextOpen);
    }
  };

  const handleOpenUsers: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpenUsers(nextOpen);
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
                disabled={loadingItem || isLoading || dataSource?.length === 1}
                onClick={handlePrevElement}
              >
                <img src="./img/drawer/up-arrow.svg" alt="" />
              </button>
              <button
                title="next-element"
                className="control__item control__item_down-arrow"
                disabled={loadingItem || isLoading || dataSource?.length === 1}
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
              <div
                className="drawer-header__username"
                style={{
                  overflow:
                    isFullScreen || feature === 'lead' || feature === 'order'
                      ? 'initial'
                      : 'hidden',
                }}
              >
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
                <Dropdown
                  menu={{
                    items: [
                      {
                        label: <p>Test</p>,
                        key: '4',
                      },
                    ],
                  }}
                  trigger={['click']}
                >
                  <Button>
                    <Space>
                      12 days old
                      <CaretDownOutlined
                        className="mt-5"
                        style={{ fontSize: 16 }}
                      />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            )}
            {/* USERS DROPDOWN */}
            <div className="drawer-header__btnitem __avatar">
              <img
                src={extraUser?.picture ?? '/img/empty-user.jpeg'}
                alt={extraUser?.firstName || 'User'}
                className="user-avatar mr-10"
              />
              <Dropdown
                menu={{
                  items: itemsUsers,
                  selectable: false,
                  defaultSelectedKeys: [''],
                }}
                placement="bottom"
                trigger={['click']}
                arrow={{ pointAtCenter: true }}
                open={isOpenUsers && !isLoadingUsers}
                destroyPopupOnHide={true}
                onOpenChange={handleOpenUsers}
                className={classNames(
                  feature === 'lead' ? 'lead-page' : '',
                  'drawer-header__settings',
                )}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span className="user-name">
                      {extraUser?.firstName + ' ' + extraUser?.lastName}
                    </span>
                    {isFetchingUsers && !users?.length && isOpenUsers ? (
                      <LoadingOutlined
                        className="mt-5"
                        style={{ fontSize: 16 }}
                      />
                    ) : (
                      <CaretDownOutlined
                        className="mt-5"
                        style={{ fontSize: 16 }}
                      />
                    )}
                  </Space>
                </a>
              </Dropdown>
            </div>
            {feature === 'quote' && (
              <div className="drawer-header__btnitem">
                <Dropdown
                  menu={{
                    items: itemsUpcoming,
                    selectable: false,
                    defaultSelectedKeys: [''],
                  }}
                  trigger={['click']}
                >
                  <Button>
                    <Space>
                      {isLoading ? 'Updating..' : featureStatusName()}
                      <CaretDownOutlined
                        className="mt-5"
                        style={{ fontSize: 16 }}
                      />
                    </Space>
                  </Button>
                </Dropdown>
              </div>
            )}
            <div className="drawer-header__btnitem ">
              {feature === 'quote' && (
                <Button className="" type="primary" onClick={onOpenConvert}>
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
                  {featureStatusName()}
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
                      onClick={() => {
                        if (feature === 'order') {
                          setPostCDTypeAction('repost');
                          orderPostCD({
                            guid: orderData.guid,
                            action: 'repost',
                          });
                        }
                      }}
                      disabled={isLoadingPostCD}
                      loading={
                        isLoadingPostCD && isPostCDTypeAction === 'repost'
                      }
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
                    onClick={() => {
                      if (feature === 'order') {
                        setPostCDTypeAction('post');
                        orderPostCD({
                          guid: orderData.guid,
                          action: 'post',
                        });
                      }
                    }}
                    disabled={isLoadingPostCD}
                    loading={isLoadingPostCD && isPostCDTypeAction === 'post'}
                  >
                    Post to CD
                  </Button>
                ) : null)}

              {(feature === 'lead' || feature === 'quote') &&
                featureData.status !== 'archived' && (
                  <Button
                    className="ml-10 mr-10"
                    type="primary"
                    danger
                    disabled={isLoading}
                    loading={isLoading}
                    onClick={() => setOpenArchiveModal(true)}
                  >
                    Archive
                  </Button>
                )}
              {feature === 'lead' && featureData.status === 'archived' && (
                <Button
                  className="ml-10 mr-10"
                  type="primary"
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={() => {
                    dispatch(
                      updateLeadField({ field: 'status', value: 'leads' }),
                    );
                    setStatusUpdated(true);
                  }}
                >
                  Back to Leads
                </Button>
              )}
              {feature === 'quote' && featureData.status === 'archived' && (
                <Button
                  className="ml-10 mr-10"
                  type="primary"
                  disabled={isLoading}
                  loading={isLoading}
                  onClick={() => {
                    dispatch(
                      updateQuoteField({ field: 'status', value: 'quote' }),
                    );
                    setStatusUpdated(true);
                  }}
                >
                  Back to Quotes
                </Button>
              )}
              {feature === 'order' &&
                ['issue', 'onhold', 'archived'].includes(status) && (
                  <Button
                    className="ml-10"
                    type="primary"
                    onClick={() => {
                      dispatch(
                        updateOrderField({ field: 'status', value: 'orders' }),
                      );
                      setStatusUpdated(true);
                    }}
                    disabled={isLoading}
                    loading={isLoading}
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
                    onClick={() => setOpenArchiveModal(true)}
                    disabled={isLoading}
                    loading={isLoading}
                  >
                    Archive
                  </Button>
                )}

              {feature === 'order' && status === 'posted' && (
                <Button
                  className="ml-10 mr-10"
                  type="primary"
                  danger
                  onClick={() => {
                    // dispatch(
                    //   updateOrderField({ field: 'status', value: 'booked' }),
                    // );
                    // setStatusUpdated(true);
                    setPostCDTypeAction('delete');
                    orderPostCD({
                      guid: orderData.guid,
                      action: 'delete',
                    });
                  }}
                  disabled={isLoadingPostCD}
                  loading={isLoadingPostCD && isPostCDTypeAction === 'delete'}
                >
                  Remove from CD
                </Button>
              )}
              {feature === 'order' && status === 'dispatched' && (
                <Button
                  className="ml-10"
                  type="primary"
                  onClick={() => {
                    dispatch(
                      updateOrderField({ field: 'status', value: 'pickedup' }),
                    );
                    setStatusUpdated(true);
                  }}
                  disabled={isLoading}
                  loading={isLoading}
                >
                  Mark as Picked up
                </Button>
              )}
              {feature === 'order' && status === 'pickedup' && (
                <Button
                  className="ml-10"
                  type="primary"
                  onClick={() => {
                    dispatch(
                      updateOrderField({ field: 'status', value: 'completed' }),
                    );
                    setStatusUpdated(true);
                  }}
                  disabled={isLoading}
                  loading={isLoading}
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
                <Dropdown
                  menu={{
                    items: itemsTeamSupports,
                    selectable: false,
                    defaultSelectedKeys: [''],
                  }}
                  trigger={['click']}
                  placement="bottom"
                  arrow={{ pointAtCenter: true }}
                  open={isOpenTeamSupport && !isLoadingUsers}
                  destroyPopupOnHide={true}
                  onOpenChange={handleOpenTeamSupport}
                >
                  <Button>
                    <Space>
                      Team support
                      {isFetchingUsers &&
                      !users?.length &&
                      isOpenTeamSupport ? (
                        <LoadingOutlined
                          className="mt-5"
                          style={{ fontSize: 16 }}
                        />
                      ) : (
                        <CaretDownOutlined
                          className="mt-5"
                          style={{ fontSize: 16 }}
                        />
                      )}
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
                className: 'drawer-header__settings',
              }}
              trigger={['click']}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              open={isOpenSettings}
              destroyPopupOnHide={true}
              onOpenChange={handleOpenSettings}
              overlayStyle={{ width: 150 }}
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
      {/* MODAL FOR ARCHIVE */}
      <Modal
        title="Reason To Archive"
        open={isOpenArchiveModal}
        onCancel={() => setOpenArchiveModal(false)}
        width="small"
        padding="15"
        saveBtnText="Archive"
        onSave={handleArchive}
        saveBtnDanger
        loading={isLoadingArchive}
      >
        <div className="d-flex justify-between">
          <div className="d-flex">
            <div className="form-label pl-0">Reason</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select reason"
            onChange={(e) => setArchiveReason(e)}
            style={{ width: 218 }}
            loading={isLoadingArchive}
            options={
              feature === 'quote'
                ? QUOTE_ARCHIVE_REASONS
                : feature === 'order'
                  ? ORDER_ARCHIVE_REASONS
                  : feature === 'lead'
                    ? LEAD_ARCHIVE_REASONS
                    : []
            }
          />
        </div>
      </Modal>
      {/* MODAL FOR RE-ASSIGN USERS */}
      <Modal
        title="Why are you reassigning?"
        open={isOpenReassignModal}
        onCancel={() => setOpenReassignModal(false)}
        width="small"
        padding="15"
        onSave={handleReassign}
        loading={isLoadingReassign}
      >
        <div className="d-flex justify-between">
          <div className="d-flex">
            <div className="form-label pl-0">Reason</div>
          </div>
          <Select
            size="small"
            showSearch
            optionFilterProp="children"
            filterOption={false}
            placeholder="Select reason"
            onChange={(e) => setReassignReason(e)}
            style={{ width: 218 }}
            loading={isLoadingReassign}
            options={REASSIGN_USERS_REASONS}
          />
        </div>
      </Modal>
    </div>
  );
}

export default DrawerHeader;
