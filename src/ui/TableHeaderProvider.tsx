import { Dropdown, DropdownProps, MenuProps, Space } from 'antd';
import { useState } from 'react';
import ellipse from '../../public/img/dt_table/ellipse.svg';
import { useProviders } from '../features/providers/useProviders';

// import { useSearchParams } from 'react-router-dom';

type Option = {
  label: string;
  value: string;
};

type TableSelectProps = {
  selectField: string;
  options: Option[];
};

function TableHeaderProvider({
  selectField,
  options,
  ...props
}: TableSelectProps) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const value = searchParams.get(selectField) || options[0].value;

  // function handleChange(e: { target: { value: string } }) {
  //   searchParams.set(selectField, e.target.value);
  //   setSearchParams(searchParams);
  // }

  console.log(selectField, options);
  const [open, setOpen] = useState(false);
  // DROPDOWN FUNCTION
  const { providers, isLoading, error } = useProviders(open);

  console.log('providers', providers, isLoading, error);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="d-flex align-center justify-between">
          Lead providers
        </div>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div>
          <p className="dropdown-clear d-inline mr-5 ml-5">Clear all</p>
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
                <p className="dropdown-text">Provider 01</p>
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
                <p className="dropdown-text">Provider 01</p>
                <span className="ml-20">1200</span>
              </label>
            </div>
          </div>
        </div>
      ),
      key: '2',
    },
  ];

  return (
    <div className="dt-header__allsources dt-header-select">
      <img className="dt-header-select_icon" src={ellipse} alt="" />
      <div {...props} className="dt-header__allsources_select">
        <Dropdown
          menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
          open={open}
          destroyPopupOnHide={true}
          overlayClassName="dt-header__dropdown"
          onOpenChange={handleOpenChange}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="dt-header__showlist_price">All sources</p>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default TableHeaderProvider;
