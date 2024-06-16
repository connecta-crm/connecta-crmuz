import TableHeaderPagination from './TableHeaderPagination';
import TableHeaderProvider from './TableHeaderProvider';
import TableHeaderSearch from './TableHeaderSearch';
import TableHeaderUsers from './TableHeaderUsers';
import hamburg from '/img/dt_table/hamburg_menu.svg';

export type TableHeaderFiltersProps = {
  count: number;
  sumPrice: number | undefined;
};
function TableHeaderFilters({ count, sumPrice }: TableHeaderFiltersProps) {
  return (
    <div className="dt-header__filters">
      <TableHeaderProvider />
      <TableHeaderPagination count={count} sumPrice={sumPrice} />
      <TableHeaderSearch />
      <TableHeaderUsers />
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default TableHeaderFilters;
