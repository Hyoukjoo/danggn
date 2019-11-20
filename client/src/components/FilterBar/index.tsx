import React, { useState, useCallback } from 'react';

import CarFilter from './CarFilter';
import { CATEGORY_WITH_OPTION } from '~constants';

const FilterBar: React.FC<{ category: number }> = ({ category }) => {
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const showFilter = () => {
    setIsFilter(true);
  };

  const hideFilter = () => {
    setIsFilter(false);
  };

  const renderFilter = useCallback(() => {
    switch (category) {
      case 1:
        return <CarFilter hideFilter={hideFilter} category={category} />;
      default:
        return;
    }
  }, [category]);
  return (
    <nav className="filterbar-nav">
      {CATEGORY_WITH_OPTION.includes(category) && !isFilter && (
        <div className="filterbar-container">
          <div className="btn-filter" onClick={showFilter}>
            <i className="material-icons">filter_list</i>
          </div>
        </div>
      )}
      {isFilter && renderFilter()}
    </nav>
  );
};

export default FilterBar;
