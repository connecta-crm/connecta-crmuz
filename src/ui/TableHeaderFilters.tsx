import hamburg from '../../public/img/dt_table/hamburg_menu.svg';
import TableHeaderDiscount from './TableHeaderDiscount';
import TableHeaderPagination from './TableHeaderPagination';
import TableHeaderSearch from './TableHeaderSearch';
import TableHeaderUsers from './TableHeaderUsers';

export type TableHeaderFiltersProps = {
  currentPage: number;
  totalPages: number;
  totalData: number;
};
function TableHeaderFilters({
  currentPage,
  totalPages,
  totalData,
}: TableHeaderFiltersProps) {
  const discountOptions = [
    { value: 'all', label: 'All' },
    { value: 'no-discount', label: 'No discount' },
    { value: 'with-discount', label: 'With discount' },
  ];

  const userOptions = [
    { value: 'all', label: 'All' },
    { value: 'user-1', label: 'User 1' },
    { value: 'user-2', label: 'User 2' },
  ];

  return (
    <div className="dt-header__filters">
      <TableHeaderDiscount selectField="discount" options={discountOptions} />
      <TableHeaderPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalData={totalData}
      />
      <TableHeaderSearch />
      <TableHeaderUsers selectField="users" options={userOptions} />
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default TableHeaderFilters;
