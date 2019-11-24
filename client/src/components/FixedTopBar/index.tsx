import React, { useState, useEffect, useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import TopFilterModal from '~components/TopFilterModal';

import { PAGE_PATHS, STORES } from '~constants';
import ProductsStore from '~stores/product/ProductStore';
//@ts-ignore
import LogoImage from '~assets/logo-basic.svg';

type ListByCategoryProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & I_props;

interface I_props {
  category?: number;
}

export interface I_Filter {
  startOld: number;
  endOld: number;
  startMileage: number;
  endMileage: number;
  isSmoker: boolean | undefined;
}

const FixedTopBar: React.FC<ListByCategoryProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const [isFilterModal, setIsFilterModal] = useState<boolean>(false);
    const [filter, setFilter] = useState<I_Filter>();

    const category = props.category ? props.category : undefined;

    useEffect(() => {
      props[STORES.PRODUCTS_STORE].filterProduct(category, filter);
    }, [filter]);

    const showFilterModal = () => {
      if (isFilterModal) setIsFilterModal(false);
      else setIsFilterModal(true);
    };

    const renderFilterBar = useCallback(() => {
      switch (category) {
        case 1:
          return (
            <li className="nav-item">
              <button className={filter ? 'btn-filter active' : 'btn-filter'} onClick={showFilterModal}>
                <i className="material-icons ic-filter">filter_list</i>
              </button>
            </li>
          );
        default:
          return;
      }
    }, [category, filter]);

    return (
      <>
        <nav className="navbar nav-global fixed-top navbar-expand-sm">
          <div className="container">
            <Link to={PAGE_PATHS.PRODUCT_LISTS}>
              <img className="img-brand" alt="당근마켓" width="132" src={LogoImage} />
            </Link>
            <ul className="navbar-nav ml-auto">
              {renderFilterBar()}
              <li className="nav-item">
                <Link
                  to={category ? `${PAGE_PATHS.PRODUCT_REGISTRATION}/${category}` : PAGE_PATHS.PRODUCT_REGISTRATION}
                >
                  <i className="material-icons ic-create">create</i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {isFilterModal && <TopFilterModal showFilterModal={showFilterModal} filter={filter} setFilter={setFilter} />}
      </>
    );
  }),
);

export default FixedTopBar;
