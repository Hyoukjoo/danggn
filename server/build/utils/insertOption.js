"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CarOption_1 = require("../models/CarOption");
const RealEstateOption_1 = require("../models/RealEstateOption");
const insertOption = (productId, optionDetail) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (optionDetail.optionType) {
            case '차량':
                const { old, mileage, isSmoker } = optionDetail;
                return yield CarOption_1.default.create({
                    productId,
                    old: parseInt(old, 10),
                    mileage: parseInt(mileage, 10),
                    isSmoker: isSmoker === 'true',
                });
            case '부동산':
                const { address, floor, size } = optionDetail;
                return yield RealEstateOption_1.default.create({
                    productId,
                    address,
                    floor: parseInt(floor, 10),
                    size: parseInt(size, 10),
                });
            default:
                break;
        }
    }
    catch (e) {
        throw new Error('추가 항목을 등록할 수 없습니다.');
    }
});
exports.default = insertOption;
