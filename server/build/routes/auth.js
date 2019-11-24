"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const User_1 = require("../models/User");
const config_1 = require("../config");
const jwt = require("jwt-simple");
const router = express.Router();
const isValidEmail = (email) => {
    const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(email);
};
const checkEmailPw = (email, pw) => {
    if (!email || !pw) {
        return { msg: '이메일 또는 비밀번호를 넣어주세요.' };
    }
    if (!isValidEmail(email)) {
        return { msg: '이메일 양식에 맞게 넣어주세요.' };
    }
};
router.post('/login', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const error = checkEmailPw(email, password);
    if (error) {
        return res.status(400).send(error);
    }
    const user = yield User_1.default.findOne({
        where: { email }
    });
    if (user) {
        const isValidPassword = user.validPassword(password);
        if (isValidPassword) {
            const token = jwt.encode({ id: user.id, email: user.email }, config_1.default.auth.key);
            res.json({ data: { token, user }, msg: '로그인 성공!' });
        }
        else {
            return res.status(400).json({ msg: '비밀번호가 잘 못 되었습니다.' });
        }
    }
    else {
        return res.status(404).json({ msg: '해당하는 사용자가 없습니다.' });
    }
}));
router.post('/signup', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const error = checkEmailPw(email, password);
    if (error) {
        return res.status(400).send(error);
    }
    const user = yield User_1.default.findOne({
        where: { email }
    });
    if (user) {
        return res.status(400).json({ msg: '이미 등록된 이메일 입니다.' });
    }
    const createdUser = yield User_1.default.create({ email, password });
    return res.json({
        data: { id: createdUser.id },
        msg: '가입에 성공하였습니다.'
    });
}));
exports.default = router;
