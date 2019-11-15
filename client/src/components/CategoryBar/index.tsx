import React from 'react';
import { Link } from 'react-router-dom';

import { PAGE_PATHS } from '~constants';

const CategoryBar: React.FC = () => {
  return (
    <div className="categories-group">
      <Link to={`${PAGE_PATHS.PRODUCT_CATEGORY}/0`} className="btn btn-category">
        인기매물
      </Link>
      <Link to={`${PAGE_PATHS.PRODUCT_CATEGORY}/1`} className="btn btn-category">
        차량
      </Link>
      <Link to={`${PAGE_PATHS.PRODUCT_CATEGORY}/2`} className="btn btn-category">
        가구/인테리어
      </Link>
      <Link to={`${PAGE_PATHS.PRODUCT_CATEGORY}/3`} className="btn btn-category">
        유아동/유아도서
      </Link>
      <Link to={`${PAGE_PATHS.PRODUCT_CATEGORY}/4`} className="btn btn-category">
        생활/가공식품
      </Link>
    </div>
  );
};

export default CategoryBar;
