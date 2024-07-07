import { ReactNode, createContext, useContext, useState } from 'react';

type FilterContextType = {
  show: boolean;
  hideFilter: () => void;
  showFilter: () => void;
  searchFilterText: string;
  setSearchFilterText: (a: string) => void;
};

const FilterContext = createContext<FilterContextType | null>(null);

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [searchFilterText, setSearchFilterText] = useState<string>('');

  const hideFilter = () => setShow(false);
  const showFilter = () => setShow(true);

  return (
    <FilterContext.Provider
      value={{
        show,
        hideFilter,
        showFilter,
        searchFilterText,
        setSearchFilterText,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export default FilterProvider;
