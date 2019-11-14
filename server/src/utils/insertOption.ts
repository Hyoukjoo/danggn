import CarOption from '../models/CarOption';
import RealEstateOption from '../models/RealEstateOption';

const insertOption = async (productId: number, product: any) => {
  try {
    switch (product.option) {
      case '차량':
        const { old, mileage, isSmoker } = product;
        return await CarOption.create({
          productId,
          old: parseInt(old, 10),
          mileage: parseInt(mileage, 10),
          isSmoker: isSmoker === 'true',
        });

      case '부동산':
        const { address, floor, size } = product;
        return await RealEstateOption.create({
          productId,
          address,
          floor: parseInt(floor, 10),
          size: parseInt(size, 10),
        });

      default:
        break;
    }
  } catch (e) {
    throw Error('추가 항목을 등록할 수 없습니다.');
  }
};

export default insertOption;
