"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = {
    auth: {
        key: process.env.AUTH_KEY || 'prgms-daangn-key',
    },
    db: {
        url: process.env.MYSQL_URL || 'mysql://root:root@localhost:3306/my_database',
    },
};
