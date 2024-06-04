import CheckButton from './CheckButton';
import TableHeaderProvider from './TableHeaderProvider';
import hamburg from '/img/dt_table/hamburg_menu.svg';

export type TableHeaderFiltersProps = {
  count?: number;
  hasFilterSelect?: boolean;
  hasFilterBtn?: boolean;
  pagename?: string;
};
function SettingsTableHeaderFilters({
  count = 4,
  hasFilterSelect = true,
  hasFilterBtn = true,
  pagename,
}: TableHeaderFiltersProps) {
  return (
    <div className="dt-header__filters">
      {hasFilterBtn && (
        <div className="dt-header__filter-btns">
          <CheckButton type="type" title="standard" />
          <CheckButton type="type" title="exclusive" />
        </div>
      )}
      {hasFilterSelect && <TableHeaderProvider />}
      <div className="dt-header__data-count">
        Total {count} {pagename}
      </div>
      <div className="dt-header__hamburg">
        <img src={hamburg} alt="" />
      </div>
    </div>
  );
}

export default SettingsTableHeaderFilters;
