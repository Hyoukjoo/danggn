import React, { useEffect, useCallback, useRef } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Footer from '~components/Footer';
import FixedTopBar from '~components/FixedTopBar';
import CategoryBar from '~components/CategoryBar';
import Product from '~pages/ProductList/Product';

import ProductsStore from '~stores/product/ProductStore';
import { PAGE_PATHS, STORES } from '~constants';

type InjectedProps = {
  [STORES.PRODUCTS_STORE]: ProductsStore;
} & RouteComponentProps;

const ProductList: React.FC<InjectedProps> = inject(STORES.PRODUCTS_STORE)(
  observer(props => {
    const { products, getAllProducts, hasMoreProducts } = props[STORES.PRODUCTS_STORE];
    const countLastId = useRef<number[]>([]);

    const onScroll = useCallback(() => {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMoreProducts) {
          const lastId = products[products.length - 1].id;
          if (!countLastId.current.includes(lastId)) {
            getAllProducts(lastId);
            countLastId.current.push(lastId);
          }
        }
      }
    }, [products.length, hasMoreProducts]);

    useEffect(() => {
      countLastId.current = [];
      getAllProducts();
    }, []);

    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, [products.length]);

    return (
      <>
        <FixedTopBar />
        <div className="container container-main-index">
          <h5 className="container-headline">중고 거래 제품</h5>

          <CategoryBar />

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

export default ProductList;
