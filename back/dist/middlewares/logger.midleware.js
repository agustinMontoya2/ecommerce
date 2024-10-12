"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = LoggerMiddleware;
function LoggerMiddleware(req, res, next) {
    const date = new Date();
    const fecha = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
    console.log(`A request of the type ${req.method} has been made to route ${req.url} on day ${fecha}`);
    next();
}
//# sourceMappingURL=logger.midleware.js.map