"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const multer = require("multer");
const Product_1 = require("../models/Product");
const insertOption_1 = require("../utils/insertOption");
const findOption_1 = require("../utils/findOption");
const findAllOptions_1 = require("../utils/findAllOptions");
const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.get('', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.findAll();
    res.json({ data: products });
}));
router.get('/:id', upload.single('image'), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const product = yield findOption_1.default(id);
        return res.json({ data: product });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}));
router.post('', upload.single('image'), (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const image = req.file;
    const product = req.body;
    const { userId, category, price, title, description, optionType } = product;
    const optionDetail = {};
    for (let key in product) {
        const basic = ['image', 'userId', 'category', 'price', 'title', 'description'];
        if (!basic.includes(key))
            Object.assign(optionDetail, { [key]: product[key] });
    }
    try {
        const insertedProduct = yield Product_1.default.create({
            userId,
            category,
            price,
            title,
            description,
            image: `/${image.path}`,
        });
        if (optionType)
            yield insertOption_1.default(insertedProduct.id, optionDetail);
        return res.json({
            data: insertedProduct,
            msg: '상품등록에 성공하였습니다.',
        });
    }
    catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}));
router.get('/category/:category', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    try {
        const data = yield findAllOptions_1.default(parseInt(category, 10));
        return res.json({ data });
    }
    catch (e) {
        return res.status(500).json({ msg: e.messgae });
    }
}));
exports.default = router;
