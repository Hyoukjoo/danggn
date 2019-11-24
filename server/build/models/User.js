"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
class User extends sequelize_1.Model {
    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}
exports.default = User;
