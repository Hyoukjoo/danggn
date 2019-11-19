import Product from '../models/Product';

import CarOption from '../models/CarOption';
import RealEstateOption from '../models/RealEstateOption';

const findOption = async (productId: number) => {
  const product = await Product.findByPk(productId);
  if (!product) return null;
  try {
    switch (product.category) {
      case 1:
        return await Product.findByPk(productId, {
          include: [
            {
              model: CarOption,
              as: 'carOptions',
              attributes: ['old', 'mileage', 'isSmoker'],
            },
          ],
        });
      case 4:
        return await Product.findByPk(productId, {
          include: [
            {
              model: RealEstateOption,
              as: 'realEstateOptions',
              attributes: ['address', 'floor', 'size'],
            },
          ],
        });
      default:
        return product;
    }
  } catch (e) {
    console.error(e);
    throw new Error('옵션을 찾을 수가 없습니다.');
  }
};

export default findOption;
