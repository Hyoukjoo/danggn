import React from 'react';

import CarFilter from './CarFilter';

interface I_props {
  category?: number;
}

const FilterBar: React.FC<I_props> = ({ category }) => {
  return (
    <nav className="filterbar">
      <div className="container">
        <CarFilter category={category} />
      </div>
    </nav>
  );
};

export default FilterBar;
