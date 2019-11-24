"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CarOption_1 = require("../models/CarOption");
const Product_1 = require("../models/Product");
const constants_1 = require("./constants");
const findAllOption = (category) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!constants_1.CATEGORY_WITH_OPTION.includes(category))
        return yield Product_1.default.findAll({ where: { category } });
    else {
        try {
            switch (category) {
                case 1:
                    return yield Product_1.default.findAll({
                        where: { category },
                        include: [
                            {
                                model: CarOption_1.default,
                                as: 'carOptions',
                                attributes: ['old', 'mileage', 'isSmoker'],
                            },
                        ],
                    });
                default:
                    return yield Product_1.default.findAll({ where: { category } });
            }
        }
        catch (e) {
            console.log(e);
            throw new Error('옵션을 불러올 수 없습니다');
        }
    }
});
exports.default = findAllOption;
