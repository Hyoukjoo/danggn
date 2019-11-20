import { I_Filter } from '~components/FixedTopBar';
import { ProductWithOptionDto } from '~services/types';

const filterProductsHelper = (category: number | undefined, products: ProductWithOptionDto[], filter: I_Filter) => {
  switch (category) {
    case 1:
      return filterCarProducts(products, filter);
    default:
      return products;
  }
};

const filterCarProducts = (products: ProductWithOptionDto[], filter: I_Filter) => {
  const { startOld, endOld, startMileage, endMileage } = filter;
  const filteredProducts = Array.from(products).filter(product => {
    if (product.carOptions) {
      const { old, mileage, isSmoker } = product.carOptions;
      if (startOld === endOld && startOld !== old) return false;
      if (startMileage === endMileage && startMileage !== mileage) return false;
      if (
        old < startOld ||
        old > endOld ||
        mileage < startMileage ||
        mileage > endMileage ||
        (isSmoker !== filter.isSmoker && typeof filter.isSmoker !== 'undefined')
      )
        return false;
      else return true;
    } else return false;
  });

  return filteredProducts;
};

export default filterProductsHelper;
