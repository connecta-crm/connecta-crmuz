import { ReactNode, createContext, useContext, useState } from 'react';

type FilterContextTyp = {
  show: boolean;
  hideFilter: () => void;
  showFilter: () => void;
};

const FilterContext = createContext<FilterContextTyp | null>(null);

const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);

  const hideFilter = () => setShow(false);
  const showFilter = () => setShow(true);

  return (
    <FilterContext.Provider value={{ show, hideFilter, showFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextTyp => {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export default FilterProvider;
