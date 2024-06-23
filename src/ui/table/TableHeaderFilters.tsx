import { SourceType } from '../Drawer';
import TableHeaderPagination from './TableHeaderPagination';
import TableHeaderProvider from './TableHeaderProvider';
import TableHeaderSearch from './TableHeaderSearch';
import TableHeaderUsers from './TableHeaderUsers';
import period from '/img/details/period.svg';
import hamburg from '/img/dt_table/hamburg_menu.svg';

export type TableHeaderFiltersProps = {
  count: number;
  sumPrice: number | undefined;
  sourceType?: SourceType;
};
function TableHeaderFilters({
  count,
  sumPrice,
  sourceType,
}: TableHeaderFiltersProps) {
  return (
    <div className="dt-header__filters">
      {sourceType !== 'task' && sourceType !== 'insight' && (
        <TableHeaderProvider />
      )}
      {sourceType !== 'insight' && (
        <TableHeaderPagination
          count={count}
          sumPrice={sumPrice}
          sourceType={sourceType}
        />
      )}
      {sourceType !== 'insight' && <TableHeaderSearch />}
      {sourceType === 'insight' && (
        <div className="dt-header__users dt-header-select">
          <img className="dt-header-select_icon" src={period} alt="" />
          {/* <img
            className="dt-header-select_avater"
            src={user?.picture ?? '/img/empty-user.jpeg'}
            alt=""
          /> */}
          <div className="dt-header__allsources_select">
            {/* <Dropdown
              menu={{ items, selectable: false, defaultSelectedKeys: [''] }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
              trigger={['click']}
              open={open}
              destroyPopupOnHide={true}
              overlayClassName="dt-header__dropdown"
              overlayStyle={{ width: 220 }}
              onOpenChange={handleOpenChange}
            > */}
            <div onClick={(e) => e.preventDefault()}>
              {/* <Space> */}
              <p className="dt-header__showlist_price">Period</p>
              {/* </Space> */}
            </div>
            {/* </Dropdown> */}
          </div>
        </div>
      )}
      <TableHeaderUsers sourceType={sourceType} />
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default TableHeaderFilters;
