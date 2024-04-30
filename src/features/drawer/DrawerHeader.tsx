import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { classNames } from '../../utils/helpers';
import { DrawerControlProps } from './DrawerControl';

function DrawerHeader({
  isFullScreen,
  onClose,
  onFullScreen,
}: DrawerControlProps) {
  let controls = (
    <>
      <div onClick={onClose} className="control__item control__item_close">
        <img src="./img/drawer/close-x.svg" alt="" />
      </div>
      <div className="control__item control__item_up-arrow">
        <img src="./img/drawer/up-arrow.svg" alt="" />
      </div>
      <div className="control__item control__item_down-arrow">
        <img src="./img/drawer/down-arrow.svg" alt="" />
      </div>
      <div
        onClick={() => onFullScreen(false)}
        className="control__item control__item_size"
      >
        <img src="./img/drawer/resize.svg" alt="" />
      </div>
    </>
  );
  if (!isFullScreen) {
    controls = <></>;
    console.log('controls', controls);
  }

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

  return (
    <div className="drawer-header">
      <div className="drawer-header__container">
        <div className="drawer-header__left control">
          {controls}
          <div
            className={classNames(
              isFullScreen ? 'ml-20' : '',
              'd-flex flex-column',
            )}
          >
            <div className="d-flex">
              <div className="drawer-header__id id_1">#600000</div>
              <div className="drawer-header__username">John Smith</div>
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
            <div className="drawer-header__btnitem">
              <Button type="primary">Convert to order</Button>
              <Button className="ml-10" type="primary" danger>
                Archive
              </Button>
            </div>
            <div className="drawer-header__btnitem">
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
