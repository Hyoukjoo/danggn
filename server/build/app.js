"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path = require("path");
const express = require("express");
const DB = require("./models/index");
const cors = require("cors");
const auth_1 = require("./routes/auth");
const product_1 = require("./routes/product");
const logger_1 = require("./logger");
const stopServer = (server, sequelize, signal) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Stopping server with signal: ${signal}`);
    yield server.close();
    yield sequelize.close();
    process.exit();
});
function runServer() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const sequelize = DB.init();
        const app = express();
        app.use(express.json());
        app.use(cors());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use('/api/auth', auth_1.default);
        app.use('/api/products', product_1.default);
        app.get('/uploads/:fileName', (req, res) => {
            const fileName = req.params.fileName;
            console.log(fileName);
            res.sendFile(path.join(__dirname, `../uploads/${fileName}`));
        });
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
        const server = app.listen(process.env.PORT || 5000, () => {
            logger_1.default.info(`Example app listening on port ${process.env.PORT}!`);
        });
        try {
            yield sequelize.authenticate();
            yield sequelize.sync({
                force: false,
            });
        }
        catch (e) {
            stopServer(server, sequelize);
            throw e;
        }
    });
}
runServer()
    .then(() => {
    logger_1.default.info('run succesfully');
})
    .catch((ex) => {
    logger_1.default.error('Unable run:', ex);
});
