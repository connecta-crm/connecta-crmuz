import { Dropdown, DropdownProps, Input, MenuProps, Space } from 'antd';

import { debounce } from 'lodash';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_LIMIT } from '../../utils/constants';
import { TableHeaderFiltersProps } from './TableHeaderFilters';
import openView from '/img/dt_table/full_view.svg';
import notView from '/img/dt_table/not_full_view.svg';

type TableHeaderPaginationProps = TableHeaderFiltersProps;

function TableHeaderPagination({
  count,
  sumPrice,
}: TableHeaderPaginationProps) {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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
      $updateSearchParams({
        offset: newOffset,
        limit: inputLimit,
        status: searchParams.get('status'),
      });
    }
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEnd = Number(e.target.value);
    if (newEnd >= 0) {
      const newLimit = newEnd - inputOffset + 1;
      setInputLimit(newLimit);
      $updateSearchParams({
        offset: inputOffset.toString(),
        limit: newLimit.toString(),
        status: searchParams.get('status'),
      });
    }
  };

  // const modify = () => {
  //   updateSearchParams(inputOffset);
  // };

  const updateSearchParams = (offsetValue: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('offset');
    newSearchParams.delete('limit');
    newSearchParams.delete('source');
    newSearchParams.append('offset', String(offsetValue));
    newSearchParams.append('limit', String(inputLimit));

    setSearchParams(newSearchParams, { replace: true });
  };

  const handlePrevious = () => {
    const newOffset = Math.max(1, inputOffset - inputLimit);
    updateSearchParams(newOffset);
  };

  const handleNext = () => {
    const newOffset = inputOffset + inputLimit;
    updateSearchParams(newOffset);
  };

  useEffect(() => {
    setInputOffset(defaultOffset);
    setInputLimit(defaultLimit);
  }, [defaultOffset, defaultLimit]);

  const $updateSearchParams = useCallback(
    debounce((newParams) => {
      setSearchParams(newParams);
    }, 700),
    [setSearchParams],
  );

  // useEffect(() => {
  //   const timer = setTimeout(() => modify(), 0);
  //   return () => clearTimeout(timer);
  // }, [inputOffset, inputLimit]);

  // DROPDOWN FUNCTION
  const handleOpenChange: DropdownProps['onOpenChange'] = (nextOpen, info) => {
    if (info.source === 'trigger' || nextOpen) {
      setOpen(nextOpen);
    }
  };

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
            value={inputOffset}
            onChange={handleStartChange}
          />
          <span>-</span>
          <Input
            size="small"
            style={{ width: '50px', height: '18px', marginRight: 8 }}
            type="number"
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
      label: sumPrice && (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum price</p>
          <span>{sumPrice}</span>
        </div>
      ),
      disabled: !sumPrice,
    },
    {
      key: '4',
      label: sumPrice && (
        <div className="d-flex align-center justify-between">
          <p className="dropdown-text">Sum deposit</p>
          <span>$32,000</span>
        </div>
      ),
      disabled: !sumPrice,
    },
  ];
  return (
    <>
      <div className="dt-header__showlist">
        <Dropdown
          menu={{
            items,
            selectable: false,
            defaultSelectedKeys: [''],
          }}
          trigger={['click']}
          placement="bottom"
          arrow={{ pointAtCenter: true }}
          open={open}
          destroyPopupOnHide={true}
          onOpenChange={handleOpenChange}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {sumPrice && (
                <>
                  <p className="">${sumPrice}</p>
                  <div className="dt-header__dot"></div>
                </>
              )}
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
      <div className="dt-header__showlist_open">
        <img src={open ? notView : openView} alt="" />
      </div>
    </>
  );
}

export default TableHeaderPagination;
