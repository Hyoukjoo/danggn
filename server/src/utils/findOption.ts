import CarOption from '../models/CarOption';
import RealEstateOption from '../models/RealEstateOption';

import { CATEGORY_WITH_OPTION } from './constants';

const findOption = async (category: number, productId: number) => {
  if (!CATEGORY_WITH_OPTION.includes(category)) return null;
  else {
    try {
      switch (category) {
        case 0:
          return await CarOption.findOne({ where: { productId } });
        case 4:
          return await RealEstateOption.findOne({ where: { productId } });
        default:
          return null;
      }
    } catch (e) {
      console.error(e);
      throw new Error('옵션을 찾을 수가 없습니다.');
    }
  }
};

export default findOption;
