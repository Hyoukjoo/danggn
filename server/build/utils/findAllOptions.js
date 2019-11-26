"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const CarOption_1 = require("../models/CarOption");
const Product_1 = require("../models/Product");
const findAllOption = (category, lastId) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let where = { category };
    if (lastId) {
        Object.assign(where, {
            id: {
                [sequelize_1.Op.lt]: lastId,
            },
        });
    }
    try {
        switch (category) {
            case 1:
                return yield Product_1.default.findAll({
                    where,
                    include: [
                        {
                            model: CarOption_1.default,
                            as: 'carOptions',
                            attributes: ['old', 'mileage', 'isSmoker'],
                        },
                    ],
                    limit: 12,
                    order: [['id', 'DESC']],
                });
            default:
                return yield Product_1.default.findAll({ where });
        }
    }
    catch (e) {
        console.log(e);
        throw new Error('옵션을 불러올 수 없습니다');
    }
});
exports.default = findAllOption;
