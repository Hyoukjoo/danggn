import CarOption from '../models/CarOption';
import Product from '../models/Product';

import { CATEGORY_WITH_OPTION } from './constants';

const findAllOption = async (category: number) => {
  if (!CATEGORY_WITH_OPTION.includes(category)) return await Product.findAll({ where: { category } });
  else {
    try {
      switch (category) {
        case 1:
          return await Product.findAll({
            where: { category },
            include: [
              {
                model: CarOption,
                as: 'carOptions',
                attributes: ['old', 'mileage', 'isSmoker'],
              },
            ],
          });

        default:
          return await Product.findAll({ where: { category } });
      }
    } catch (e) {
      console.log(e);
      throw new Error('옵션을 불러올 수 없습니다');
    }
  }
};

export default findAllOption;
