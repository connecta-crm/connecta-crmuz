import { Dropdown, Input, MenuProps, Space } from 'antd';

import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import openView from '../../public/img/dt_table/full_view.svg';
import notView from '../../public/img/dt_table/not_full_view.svg';
import { DEFAULT_LIMIT } from '../utils/constants';
import { TableHeaderFiltersProps } from './TableHeaderFilters';

type TableHeaderPaginationProps = TableHeaderFiltersProps;

function TableHeaderPagination({
  count,
  sumPrice,
}: TableHeaderPaginationProps) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleMenuClick(event: boolean) {
    console.log('event', event);
    setOpen(event);
  }

  const defaultOffset = Number(searchParams.get('offset')) || 1;
  const defaultLimit = Number(searchParams.get('limit')) || DEFAULT_LIMIT;

  const [inputOffset, setInputOffset] = useState(defaultOffset);
  const [inputLimit, setInputLimit] = useState(defaultLimit);

  let endOffset = inputOffset + inputLimit - 1;
  if (endOffset > count) {
    endOffset = count;
  }

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newOffset = Number(e.target.value);
    if (newOffset >= 0) {
      setInputOffset(newOffset);
    }
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEnd = Number(e.target.value);
    if (newEnd >= 0) {
      const newLimit = newEnd - inputOffset + 1;
      setInputLimit(newLimit);
    }
  };

  const updateSearchParams = () => {
    setSearchParams({ offset: String(inputOffset), limit: String(inputLimit) });
  };

  const handlePrevious = () => {
    const newOffset = Math.max(1, inputOffset - inputLimit);
    setSearchParams({ offset: String(newOffset), limit: String(inputLimit) });
  };

  const handleNext = () => {
    const newOffset = inputOffset + inputLimit;
    setSearchParams({ offset: String(newOffset), limit: String(inputLimit) });
  };

  useEffect(() => {
    setInputOffset(defaultOffset);
    setInputLimit(defaultLimit);
  }, [defaultOffset, defaultLimit]);

  useEffect(() => {
    const timer = setTimeout(updateSearchParams, 500);
    return () => clearTimeout(timer);
  }, [inputOffset, inputLimit]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Now</p>

          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginLeft: 8 }}
            type="number"
            min={1}
            value={inputOffset}
            onChange={handleStartChange}
          />
          <span>-</span>
          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginRight: 8 }}
            type="number"
            min={inputOffset}
            value={endOffset}
            onChange={handleEndChange}
          />
          <div className="d-flex align-center dropdown-arrows">
            <button
              onClick={handlePrevious}
              disabled={inputOffset <= 1}
              title="prev-page"
              className="dropdown-arrows__btn"
            >
              <img src="./img/left-arrow.svg" alt="" />
            </button>
            <button
              onClick={handleNext}
              disabled={endOffset >= count}
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
          <span>{count}</span>
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum price</p>
          <span>{sumPrice}</span>
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
                  {inputOffset}-{endOffset}
                </p>
                /
                <p className="dt-header__showlist_allcounts">{count || '00'}</p>
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
