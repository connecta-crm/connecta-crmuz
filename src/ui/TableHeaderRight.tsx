import { Dropdown, MenuProps, Space } from 'antd';
import Input from 'antd/es/input/Input';
import { useState } from 'react';
import user from '../../public/img/dt_table/default_user_image.png';
import openView from '../../public/img/dt_table/full_view.svg';
import hamburg from '../../public/img/dt_table/hamburg_menu.svg';
import notView from '../../public/img/dt_table/not_full_view.svg';
import ellipse from '../../public/img/dt_table/ellipse.svg';
import TableSelect from './TableSelect';
function TableHeaderRight() {
  const discountOptions = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No discount' },
    { value: 'with-discount', label: 'With discount' },
  ];

  const userOptions = [
    { value: 'all', label: 'All' },
    { value: 'user-1', label: 'User 1' },
    { value: 'user-2', label: 'User 2' },
  ];

  const [open, setOpen] = useState(false);

  function handleMenuClick(event: boolean) {
    console.log('event', event);
    setOpen(event);
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Now</p>
          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginLeft: 8 }}
            defaultValue={1}
          />
          <span>-</span>
          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginRight: 8 }}
            defaultValue={50}
          />
          <div className="d-flex align-center dropdown-arrows">
            <p>
              <img src="./img/left-arrow.svg" alt="" />
            </p>
            <p>
              <img src="./img/right-arrow.svg" alt="" />
            </p>
          </div>
        </div>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">All</p>
          <span>2,500</span>
        </div>
      ),
      key: '2',
    },
    {
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum price</p>
          <span>$120,000</span>
        </div>
      ),
      key: '3',
    },
    {
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum deposit</p>
          <span>$32,000</span>
        </div>
      ),
      key: '4',
    },
  ];

  return (
    <div className="dt-header__right">
      <TableSelect selectField="discount" options={discountOptions} />
      <div className="dt-header__showlist">
        <Dropdown
          menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
          trigger={['click']}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          open={open}
          destroyPopupOnHide={true}
          overlayClassName="overlayClassName_dr"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="dt-header__showlist_price">$120,000</p>
              <div className="dt-header__dot"></div>
              <div className="dt-header__showlist_gutter">
                <p className="dt-header__showlist_perpage">1-50</p>/
                <p className="dt-header__showlist_allcounts">2500</p>
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
      <div
        onClick={() => {
          handleMenuClick(open ? false : true);
        }}
        className="dt-header__showlist_open"
      >
        <img src={open ? notView : openView} alt="" />
      </div>
      <div className="dt-header__search">
        <input
          type="text"
          className="input-search-small"
          placeholder="Search"
        />
      </div>
      <div className="dt-header__users dt-header-select">
        <img className="dt-header-select_icon" src={ellipse} alt="" />
        <img className="dt-header-select_avater" src={user} alt="" />
        <TableSelect selectField="users" options={userOptions} />
      </div>
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default TableHeaderRight;
