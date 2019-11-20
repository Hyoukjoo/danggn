import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import { STORES, PAGE_PATHS } from '~constants';
import FixedTopBar from '~components/FixedTopBar';
import Footer from '~components/Footer';
import Product from '~pages/ProductList/Product';

import ProductsStore from '~stores/product/ProductStore';
import CategoryBar from '~components/CategoryBar';
import { getCategoryName } from '~pages/utils';
import FilterBar from '~components/FilterBar';

type ListByCategoryProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & RouteComponentProps<{ category: string }>;

const ListByCategory: React.FC<ListByCategoryProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const category = parseInt(props.match.params.category, 10);
    const { products } = props[STORES.PRODUCTS_STORE];

    useEffect(() => {
      props[STORES.PRODUCTS_STORE].getAllProductByCategory(category);
    }, [category]);

    return (
      <>
        <FixedTopBar category={category} />
        <div className="container container-main-index">
          <h5 className="container-headline">{getCategoryName(category)} 중고 거래 제품</h5>

          <CategoryBar />

          <FilterBar category={category} />

          <ul className="list-products row">
            {products.map(v => (
              <li key={v.id} className="list-products-item col-12 col-md-4 col-lg-3">
                <Link to={`${PAGE_PATHS.PRODUCT}/${v.id}`}>
                  <Product product={v} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    );
  }),
);

export default ListByCategory;
