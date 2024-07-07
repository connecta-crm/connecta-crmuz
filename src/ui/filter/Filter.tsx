import { useState } from 'react';
import { useFilter } from '../../context/FilterContext';
import FilterSidebar from './FilterSidebar';
import FilterTable from './FilterTable';
import { useGlobalFilter } from './useFilter';
export default function Filter() {
  const [type, setType] = useState<string>('all');
  const { show,searchFilterText } = useFilter();
  
  
  const { data, isLoading } = useGlobalFilter({type:type, q:searchFilterText});
  return (
    <div className={show ? 'filter filter__active' : 'filter'}>
      <div className="filter__container">
        <FilterSidebar setType={setType} />
        <div className="filter__content">
          <FilterTable dataSource={data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
