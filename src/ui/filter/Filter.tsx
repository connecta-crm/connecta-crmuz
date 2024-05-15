import { useFilter } from '../../context/FilterContext';
import FilterSidebar from './FilterSidebar';
import FilterTable from './FilterTable';

export default function Filter() {
  const { show } = useFilter();
  return (
    <div className={show ? 'filter filter__active' : 'filter'}>
      <div className="filter__container">
        <FilterSidebar />
        <div className="filter__content">
          <FilterTable />
        </div>
      </div>
    </div>
  );
}
