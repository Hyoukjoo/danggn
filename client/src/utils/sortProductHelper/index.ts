import { I_filter } from '~components/FilterBar/Type';
import { ProductWithOptionDto, ProductDto } from '~services/types';

const sortProductHelper = (category: number, products: ProductWithOptionDto[], filters: I_filter[]) => {
  switch (category) {
    case 1:
      return sortCarProduct(products as ProductDto[], filters);
    default:
      return products;
  }
};

const sortCarProduct = (products: ProductWithOptionDto[], filters: I_filter[]) => {
  let sortedProducts = Array.from(products);

  for (let filter of filters) {
    sortedProducts = sortedProducts.filter(product => {
      if (!product.carOptions) return false;
      else {
        switch (filter.option) {
          case 'old':
            console.log(product.carOptions.old);
            console.log(filter);
            return product.carOptions.old === parseInt(filter.detail, 10);
          case 'mileage':
            return product.carOptions.mileage <= parseInt(filter.detail, 10);
          case 'isSmoker':
            return product.carOptions.isSmoker === (filter.detail === 'true');
          default:
            return false;
        }
      }
    });
  }

  return sortedProducts;
};

export default sortProductHelper;
