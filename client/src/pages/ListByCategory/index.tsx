import React, { useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';

import FixedTopBar from '~components/FixedTopBar';
import Footer from '~components/Footer';
import CategoryBar from '~components/CategoryBar';
import Product from '~pages/ProductList/Product';

import ProductsStore from '~stores/product/ProductStore';
import { STORES, PAGE_PATHS } from '~constants';
import { getCategoryName } from '~pages/utils';

type ListByCategoryProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & RouteComponentProps<{ category: string }>;

const ListByCategory: React.FC<ListByCategoryProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const { products, getAllProductByCategory, hasMoreProducts, filter, setFilter, filterProduct } = props[
      STORES.PRODUCTS_STORE
    ];
    const category = parseInt(props.match.params.category, 10);
    const countLastId = useRef<number[]>([]);

    const onScroll = useCallback(() => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        const lastId = products[products.length - 1].id;
        if (hasMoreProducts) {
          if (!countLastId.current.includes(lastId)) {
            getAllProductByCategory(category, lastId);
            countLastId.current.push(lastId);
          }
        }
      }
    }, [category, products, hasMoreProducts]);

    useEffect(() => {
      countLastId.current = [];
      setFilter(undefined);
      getAllProductByCategory(category);
    }, [category]);

    useEffect(() => {
      if (category) filterProduct(category, filter);
    }, [category, filter]);

    useEffect(() => {
      if (!products) return;
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, [category, products, hasMoreProducts]);

    return (
      <>
        <FixedTopBar category={category} />
        <div className="container container-main-index">
          <h5 className="container-headline">{getCategoryName(category)} 중고 거래 제품</h5>

          <CategoryBar />

          {/* <FilterBar category={category} /> */}

          <ul className="list-products row">
            {products &&
              products.map(v => (
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
