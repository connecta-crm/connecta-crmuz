import { Dropdown, MenuProps, Space } from 'antd';
import { useState } from 'react';
import user from '../../public/img/dt_table/default_user_image.png';
import ellipse from '../../public/img/dt_table/ellipse.svg';

// import { useSearchParams } from 'react-router-dom';

type Option = {
  label: string;
  value: string;
};

type TableSelectProps = {
  selectField: string;
  options: Option[];
};

function TableHeaderUsers({ selectField, options }: TableSelectProps) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const value = searchParams.get(selectField) || options[0].value;

  // function handleChange(e: { target: { value: string } }) {
  //   searchParams.set(selectField, e.target.value);
  //   setSearchParams(searchParams);
  // }

  console.log(selectField, options);
  const [open, setOpen] = useState(false);
  function handleMenuClick() {
    const val = open ? false : true;
    setOpen(val);
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="dt-header__user-active d-flex align-center justify-between">
          <p>Ali Brian (me)</p>
          <span>2,500</span>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <>
          <div className="mb-10">
            <p className="dropdown-subusername d-inline">Ali.B Team</p>
            <div className="dropdown-check">
              <div className="dropdown-check__item d-flex align-center justify-between">
                <input
                  type="checkbox"
                  name="source"
                  id="source-1"
                  className="dropdown-check__input"
                />
                <label
                  htmlFor="source-1"
                  className="label-contents d-flex align-center justify-between"
                >
                  <p className="dropdown-text">John Smith</p>
                  <span className="ml-20">1200</span>
                </label>
              </div>
              <div className="dropdown-check__item d-flex align-center justify-between">
                <input
                  type="checkbox"
                  name="source"
                  id="source-2"
                  className="dropdown-check__input"
                />
                <label
                  htmlFor="source-2"
                  className="label-contents d-flex align-center justify-between"
                >
                  <p className="dropdown-text">John Smith</p>
                  <span className="ml-20">1200</span>
                </label>
              </div>
            </div>
          </div>
          <div className="mb-10">
            <p className="dropdown-subusername d-inline">Ali.B Team</p>
            <div className="dropdown-check">
              <div className="dropdown-check__item d-flex align-center justify-between">
                <input
                  type="checkbox"
                  name="source"
                  id="source-1"
                  className="dropdown-check__input"
                />
                <label
                  htmlFor="source-1"
                  className="label-contents d-flex align-center justify-between"
                >
                  <p className="dropdown-text">John Smith</p>
                  <span className="ml-20">1200</span>
                </label>
              </div>
              <div className="dropdown-check__item d-flex align-center justify-between">
                <input
                  type="checkbox"
                  name="source"
                  id="source-2"
                  className="dropdown-check__input"
                />
                <label
                  htmlFor="source-2"
                  className="label-contents d-flex align-center justify-between"
                >
                  <p className="dropdown-text">John Smith</p>
                  <span className="ml-20">1200</span>
                </label>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="dt-header__users dt-header-select">
      <img className="dt-header-select_icon" src={ellipse} alt="" />
      <img className="dt-header-select_avater" src={user} alt="" />
      <div
        onClick={handleMenuClick}
        className="dt-header-select_position"
      ></div>
      <div className="dt-header__allsources_select">
        <Dropdown
          menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
          open={open}
          destroyPopupOnHide={true}
          overlayClassName="dt-header__dropdown"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="dt-header__showlist_price">All users</p>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default TableHeaderUsers;
