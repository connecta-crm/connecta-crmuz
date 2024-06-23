import { SourceType } from '../Drawer';
import TableHeaderPagination from './TableHeaderPagination';
import TableHeaderProvider from './TableHeaderProvider';
import TableHeaderSearch from './TableHeaderSearch';
import TableHeaderUsers from './TableHeaderUsers';
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
      {sourceType !== 'task' && <TableHeaderProvider />}
      <TableHeaderPagination
        count={count}
        sumPrice={sumPrice}
        sourceType={sourceType}
      />
      <TableHeaderSearch />
      <TableHeaderUsers sourceType={sourceType} />
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default TableHeaderFilters;
