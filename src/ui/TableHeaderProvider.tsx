import { Dropdown, DropdownProps, MenuProps, Space, Spin } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ellipse from '../../public/img/dt_table/ellipse.svg';
import { useProviders } from '../features/providers/useProviders';

function TableHeaderProvider({ ...props }) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // DROPDOWN FUNCTION
  const { providers, isLoading, error } = useProviders(open);

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const handleChangeProvider = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const newSearchParams = new URLSearchParams(searchParams);

    const currentSources = searchParams.getAll('source');
    console.log('currentSources', currentSources);

    if (checked) {
      newSearchParams.append('source', value);
    } else {
      const filteredSources = newSearchParams
        .getAll('source')
        .filter((source) => source !== value);
      newSearchParams.delete('source'); // Remove all at once
      filteredSources.forEach((source) =>
        newSearchParams.append('source', source),
      );
    }

    setSearchParams(newSearchParams, { replace: true });
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
        <>
          {isLoading ? (
            <Spin className="d-flex align-center justify-center" />
          ) : error ? (
            <p className="error-color">Error loading</p>
          ) : (
            <div>
              <p className="dropdown-clear d-inline mr-5 ml-5">Clear all</p>
              <div className="dropdown-check">
                {providers.map((provider: { id: string; name: string }) => {
                  return (
                    <div
                      key={provider.id}
                      className="dropdown-check__item d-flex align-center justify-between"
                    >
                      <input
                        type="checkbox"
                        name="source"
                        id={provider.id}
                        value={provider.id}
                        className="dropdown-check__input"
                        checked={searchParams
                          .getAll('source')
                          .includes(String(provider.id))}
                        onChange={handleChangeProvider}
                      />
                      <label
                        htmlFor={provider.id}
                        className="label-contents d-flex align-center justify-between"
                      >
                        <p className="dropdown-text">{provider.name}</p>
                        <span className="ml-20">{provider.id}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
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
