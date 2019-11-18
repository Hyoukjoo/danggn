import React from 'react';
import { I_filter } from '../Type';

interface I_props {
  category: number;
  filters: I_filter[];
  deleteOption: (option: string) => void;
}

const FilterList: React.FC<I_props> = ({ category, filters, deleteOption }) => {
  return (
    <div
      className="filter-list-container"
      style={{ gridTemplateColumns: `repeat(${filters && filters.length}, auto)` }}
    >
      {filters &&
        filters.map(filter => {
          const formatedFilter = formatCarFilter(filter);
          return (
            <div className="filter-tag-container" key={`${formatedFilter.option}`}>
              <span>
                {`${formatedFilter.detail}`}
                {formatedFilter.order && (formatedFilter.order === 'ASC' ? '▲' : '▼')}
              </span>
              <i className="material-icons" onClick={() => deleteOption(formatedFilter.option)}>
                clear
              </i>
            </div>
          );
        })}
    </div>
  );
};

const formatCarFilter = (filter: I_filter) => {
  switch (filter.option) {
    case 'old':
      return { ...filter, detail: `${filter.detail}년` };
    case 'mileage':
      return { ...filter, detail: `${filter.detail.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}km` };
    case 'isSmoker':
      return { ...filter, detail: filter.detail === 'true' ? '흡연자' : '비흡연자', order: undefined };
    default:
      return filter;
  }
};

export default FilterList;
