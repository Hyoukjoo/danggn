import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Footer from '~components/Footer';
import FixedTopBar from '~components/FixedTopBar';
import CategoryBar from '~components/CategoryBar';
import Product from '~pages/ProductList/Product';

import ProductsStore from '~stores/product/ProductStore';
import { PAGE_PATHS, STORES } from '~constants';

interface InjectedProps {
  [STORES.PRODUCTS_STORE]: ProductsStore;
}

class ProductList extends Component<InjectedProps & RouteComponentProps> {
  componentWillMount(): void {
    this.props[STORES.PRODUCTS_STORE].getAllProducts();
  }

  render() {
    const { products } = this.props[STORES.PRODUCTS_STORE];
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
  }
}

export default inject(STORES.PRODUCTS_STORE)(observer(ProductList));
