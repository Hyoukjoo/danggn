"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Product_1 = require("../models/Product");
const CarOption_1 = require("../models/CarOption");
const RealEstateOption_1 = require("../models/RealEstateOption");
const findOption = (productId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findByPk(productId);
    if (!product)
        return null;
    try {
        switch (product.category) {
            case 1:
                return yield Product_1.default.findByPk(productId, {
                    include: [
                        {
                            model: CarOption_1.default,
                            as: 'carOptions',
                            attributes: ['old', 'mileage', 'isSmoker'],
                        },
                    ],
                });
            case 4:
                return yield Product_1.default.findByPk(productId, {
                    include: [
                        {
                            model: RealEstateOption_1.default,
                            as: 'realEstateOptions',
                            attributes: ['address', 'floor', 'size'],
                        },
                    ],
                });
            default:
                return product;
        }
    }
    catch (e) {
        console.error(e);
        throw new Error('옵션을 찾을 수가 없습니다.');
    }
});
exports.default = findOption;
