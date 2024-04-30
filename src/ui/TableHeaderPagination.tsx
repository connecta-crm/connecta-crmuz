import { Dropdown, Input, MenuProps, Space } from 'antd';

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import openView from '../../public/img/dt_table/full_view.svg';
import notView from '../../public/img/dt_table/not_full_view.svg';
import { TableHeaderFiltersProps } from './TableHeaderFilters';
import { PAGE_SIZE } from '../utils/constants';

type TableHeaderPaginationProps = TableHeaderFiltersProps;

function TableHeaderPagination({
  currentPage: currentPage1,
  totalPages,
  totalData: count,
}: TableHeaderPaginationProps) {
  const [open, setOpen] = useState(false);
  console.log(count, currentPage1, totalPages);

  function handleMenuClick(event: boolean) {
    console.log('event', event);
    setOpen(event);
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', String(next));
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', String(prev));
    setSearchParams(searchParams);
  }

  // if (pageCount <= 1) return null;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Now</p>
          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginLeft: 8 }}
            defaultValue={currentPage}
          />
          <span>-</span>
          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginRight: 8 }}
            defaultValue={pageCount}
          />
          <div className="d-flex align-center dropdown-arrows">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              title="prev-page"
              className="dropdown-arrows__btn"
            >
              <img src="./img/left-arrow.svg" alt="" />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === pageCount}
              title="next-page"
              className="dropdown-arrows__btn"
            >
              <img src="./img/right-arrow.svg" alt="" />
            </button>
          </div>
        </div>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">All</p>
          <span>2,500</span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum price</p>
          <span>$120,000</span>
        </div>
      ),
    },
    {
      key: '4',
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum deposit</p>
          <span>$32,000</span>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="dt-header__showlist">
        <Dropdown
          menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
          trigger={['click']}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          open={open}
          destroyPopupOnHide={true}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <p className="">$120,000</p>
              <div className="dt-header__dot"></div>
              <div className="dt-header__showlist_gutter">
                <p className="dt-header__showlist_perpage">
                  {currentPage}-{pageCount}
                </p>
                /<p className="dt-header__showlist_allcounts">{count}</p>
              </div>
            </Space>
          </a>
        </Dropdown>
      </div>
      <div
        onClick={() => handleMenuClick(open ? false : true)}
        className="dt-header__showlist_open"
      >
        <img src={open ? notView : openView} alt="" />
      </div>
    </>
  );
}

export default TableHeaderPagination;
