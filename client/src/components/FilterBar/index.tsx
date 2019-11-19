import React, { useState } from 'react';

import CarFilter from './CarFilter';

const FilterBar: React.FC<{ category: number }> = ({ category }) => {
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const showFilter = () => {
    setIsFilter(true);
  };

  const hideFilter = () => {
    setIsFilter(false);
  };

  const renderFilter = () => {
    switch (category) {
      case 1:
        return <CarFilter hideFilter={hideFilter} category={category} />;
      default:
        return null;
    }
  };
  return (
    <nav className="filterbar-nav">
      {!isFilter && (
        <div className="filterbar-container">
          <div className="btn-filter" onClick={showFilter}>
            <i className="material-icons">details</i>
          </div>
        </div>
      )}
      {isFilter && renderFilter()}
    </nav>
  );
};

export default FilterBar;
