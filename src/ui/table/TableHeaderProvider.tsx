import { Dropdown, DropdownProps, MenuProps, Space, Spin } from 'antd';
import { ChangeEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLeadProviders } from '../../features/leads/useLeadProviders';
import { useOrderProviders } from '../../features/orders/useOrderProviders';
import { useQuoteProviders } from '../../features/quotes/useQuoteProviders';
import ellipse from '/img/dt_table/ellipse.svg';

function TableHeaderProvider({ sourceType }) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const {
    leadProviders,
    isLoading: isLoading1,
    error: error1,
  } = useLeadProviders(open && sourceType === 'lead');
  const {
    quoteProviders,
    isLoading: isLoading2,
    error: error2,
  } = useQuoteProviders(open && sourceType === 'quote');
  const {
    orderProviders,
    isLoading: isLoading3,
    error: error3,
  } = useOrderProviders(open && sourceType === 'order');

  let providers = [];
  let isLoading, error;

  switch (sourceType) {
    case 'lead':
      providers = leadProviders;
      isLoading = isLoading1;
      error = error1;
      break;
    case 'quote':
      providers = quoteProviders;
      isLoading = isLoading2;
      error = error2;
      break;
    case 'order':
      providers = orderProviders;
      isLoading = isLoading3;
      error = error3;
      break;
    default:
      return null;
  }

  const currentSourcesLength = searchParams.getAll('source')?.length;
  const isLengthEqual = currentSourcesLength === providers?.length;

  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

  const handleChangeProvider = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

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

  const handleClearSelectAll = () => {
    newSearchParams.delete('source');
    if (!isLengthEqual) {
      providers.forEach((provider: { id: string; name: string }) => {
        newSearchParams.append('source', provider.id);
      });
    }
    setSearchParams(newSearchParams, { replace: true });
  };

  const handleSourceList = () => {
    return currentSourcesLength && !isLengthEqual
      ? `${currentSourcesLength}+ source${currentSourcesLength > 1 ? 's' : ''}`
      : isLengthEqual
        ? 'All sources'
        : 'By source';
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <div className="d-flex align-center justify-between">Providers</div>
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
            <Spin size="small" className="d-flex align-center justify-center" />
          ) : error ? (
            <p className="error-color">Error loading</p>
          ) : (
            <div>
              <p
                onClick={handleClearSelectAll}
                className="dropdown-clear d-inline mr-5 ml-5 cursor-pointer"
              >
                {isLengthEqual ? 'Clear all' : 'Select all'}
              </p>
              <div className="dropdown-check">
                {providers?.length &&
                  providers.map(
                    (provider: {
                      id: string;
                      name: string;
                      leadCount?: number;
                      quoteCount?: number;
                      orderCount?: number;
                    }) => {
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
                            <p className="dropdown-text text-nowrap">
                              {provider.name || '(unknown)'}
                            </p>
                            <span className="ml-20">
                              {provider.leadCount?.toLocaleString('en-US') ??
                                provider?.quoteCount?.toLocaleString('en-US') ??
                                provider?.orderCount?.toLocaleString('en-US')}
                            </span>
                          </label>
                        </div>
                      );
                    },
                  )}
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
      <Dropdown
        menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
        trigger={['click']}
        open={open}
        destroyPopupOnHide={true}
        overlayClassName="dt-header__dropdown"
        onOpenChange={handleOpenChange}
        overlayStyle={{ minWidth: 170 }}
      >
        <a
          className="dt-header__users"
          style={{ minWidth: '115px' }}
          onClick={(e) => e.preventDefault()}
        >
          <img className="dt-header-select_icon" src={ellipse} alt="" />

          <Space>
            <p className="dt-header__showlist_price">{handleSourceList()}</p>
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default TableHeaderProvider;
