import { Op } from 'sequelize';

import CarOption from '../models/CarOption';
import Product from '../models/Product';

const findAllOption = async (category: number, lastId: number) => {
  let where = { category };
  if (lastId) {
    Object.assign(where, {
      id: {
        [Op.lt]: lastId,
      },
    });
  }
  try {
    switch (category) {
      case 1:
        return await Product.findAll({
          where,
          include: [
            {
              model: CarOption,
              as: 'carOptions',
              attributes: ['old', 'mileage', 'isSmoker'],
            },
          ],
          limit: 12,
          order: [['id', 'DESC']],
        });

      default:
        return await Product.findAll({ where });
    }
  } catch (e) {
    console.log(e);
    throw new Error('옵션을 불러올 수 없습니다');
  }
};

export default findAllOption;
