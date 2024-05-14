import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { merge } from 'lodash';
import { useEffect } from 'react';
import { useDrawerFeature } from '../../context/DrawerFeatureContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DrawerProps } from '../../ui/Drawer';
import { classNames } from '../../utils/helpers';
import {
  LeadData,
  getLeadData,
  setLeadData,
  updateField,
} from '../leads/leadSlice';
import { useLeadEdit } from '../leads/useLeadEdit';

function DrawerHeader({ leads, isLoadingLead, onOpenDrawer }: DrawerProps) {
  const { closeDrawer, isFullScreen, makeDrawerFull } = useDrawerFeature();

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

  const { editLead, updatedLeadData, isLoading, error } = useLeadEdit();
  const leadData = useAppSelector(getLeadData);
  const dispatch = useAppDispatch();

  const updateLeadModel = {
    ...leadData,
    customer: leadData.customer?.id,
    source: leadData.source?.id,
    origin: leadData.origin?.id,
    destination: leadData.destination?.id,
    user: leadData.user?.id,
    extraUser: leadData?.extraUser,
  };

  const handleArchive = () => {
    const value = leadData.status === 'leads' ? 'archive' : 'leads';
    console.log(value);
    dispatch(updateField({ field: 'status', value }));
    console.log(updateLeadModel);
    editLead({ guid: leadData.guid, updateLeadModel });
  };

  useEffect(() => {
    if (!isLoading && !error) {
      console.log(updatedLeadData);
      const merged = merge({}, leadData, updatedLeadData);
      dispatch(setLeadData(merged));
    }
  }, [isLoading, error, dispatch]);

  // PREV-NEXT functions

  const currentLeadGuid = leadData.guid;
  function getNextLeadGuid() {
    if (Array.isArray(leads)) {
      const currentIndex = leads.findIndex(
        (lead: LeadData) => lead.guid === currentLeadGuid,
      );
      const nextIndex =
        currentIndex === leads.length - 1 ? 0 : currentIndex + 1;
      return leads[nextIndex].guid;
    }
  }

  function getPreviousObjectId() {
    if (Array.isArray(leads)) {
      const currentIndex = leads.findIndex(
        (lead: LeadData) => lead.guid === currentLeadGuid,
      );
      const previousIndex =
        currentIndex === 0 ? leads.length - 1 : currentIndex - 1;
      return leads[previousIndex].guid;
    }
  }

  const handlePrevElement = () => {
    const previousLeadGuid = getPreviousObjectId();
    onOpenDrawer(previousLeadGuid);
  };
  const handleNextElement = () => {
    const nextLeadId = getNextLeadGuid();
    onOpenDrawer(nextLeadId);
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
                disabled={isLoadingLead}
                onClick={handlePrevElement}
              >
                <img src="./img/drawer/up-arrow.svg" alt="" />
              </button>
              <button
                title="next-element"
                className="control__item control__item_down-arrow"
                disabled={isLoadingLead}
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
              <div className="drawer-header__id id_1">#100{leadData.id}</div>
              <div className="drawer-header__username">
                {leadData.customerName}
              </div>
            </div>
            <div className="drawer-header__id id_2">PD: #110004, #110006</div>
          </div>
        </div>
        <div className="drawer-header__right">
          <div className="drawer-header__actions">
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
            <div className="drawer-header__btnitem d-none">
              <Dropdown menu={menuProps} trigger={['click']}>
                <Button>
                  <Space>
                    Upcoming
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
            <div className="drawer-header__btnitem ">
              <Button className="d-none" type="primary">
                Convert to order
              </Button>
              <Button
                onClick={handleArchive}
                className="ml-10 mr-10"
                type="primary"
                danger
              >
                {leadData.status === 'archive' ? 'Leads' : 'Archive'}
              </Button>
            </div>
            <div className="drawer-header__btnitem d-none">
              <Dropdown menu={menuProps} trigger={['click']}>
                <Button>
                  <Space>
                    Team support
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </div>
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
