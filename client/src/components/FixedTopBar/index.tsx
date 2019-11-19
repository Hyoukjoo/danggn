import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PAGE_PATHS } from '~constants';

//@ts-ignore
import LogoImage from '~assets/logo-basic.svg';
import TopFilterModal from '~components/TopFilterModal';

interface I_props {
  category?: number;
}

const FixedTopBar: React.FC<I_props> = ({ category }) => {
  const [isFilterModal, setIsFilterModal] = useState<boolean>(false);

  const showFilterModal = () => {
    if (isFilterModal) setIsFilterModal(false);
    else setIsFilterModal(true);
  };

  return (
    <>
      <nav className="navbar nav-global fixed-top navbar-expand-sm">
        <div className="container">
          <Link to={PAGE_PATHS.PRODUCT_LISTS}>
            <img className="img-brand" alt="당근마켓" width="132" src={LogoImage} />
          </Link>
          <ul className="navbar-nav ml-auto">
            {typeof category === 'number' && (
              <li className="nav-item">
                <button className="btn-filter" onClick={showFilterModal}>
                  <i className="material-icons ic-filter">filter_list</i>
                </button>
              </li>
            )}

            <li className="nav-item">
              <Link to={category ? `${PAGE_PATHS.PRODUCT_REGISTRATION}/${category}` : PAGE_PATHS.PRODUCT_REGISTRATION}>
                <i className="material-icons ic-create">create</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {isFilterModal && <TopFilterModal showFilterModal={showFilterModal} />}
    </>
  );
};

export default FixedTopBar;
