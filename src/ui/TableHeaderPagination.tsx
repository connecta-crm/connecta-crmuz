import { Dropdown, Input, MenuProps, Space } from 'antd';
import {  useState } from 'react';
import openView from '../../public/img/dt_table/full_view.svg';
import notView from '../../public/img/dt_table/not_full_view.svg';
import { TableHeaderFiltersProps } from './TableHeaderFilters';

type TableHeaderPaginationProps = TableHeaderFiltersProps;

function TableHeaderPagination({
  currentPage,
  totalPages,
  totalData,
}: TableHeaderPaginationProps) {
  const [open, setOpen] = useState(false);
  // const [startPage, setStart] = useState(currentPage);
  // const [lastPage, setLastPage] = useState(totalPages);





  function handleMenuClick(event: boolean) {
    console.log('event', event);
    setOpen(event);
  }

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
            defaultValue={totalPages}
          />
          <div className="d-flex align-center dropdown-arrows">
            <button
              className="left-arrow d-flex align-center gap-2"
              disabled={currentPage == 1 && true}
            >
              <img src="./img/left-arrow.svg" alt="" />
            </button>
            <button
              className="right-arrow d-flex align-center"
              disabled={currentPage == totalPages && true}
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
                  {currentPage}-{totalPages}
                </p>
                /<p className="dt-header__showlist_allcounts">{totalData}</p>
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
