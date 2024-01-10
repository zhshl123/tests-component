"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatted_now = exports.formattedDateTime_now = exports.formattedSTime_now = exports.formattedMTime_now = exports.timestamp_now = void 0;
const moment = require("moment");
exports.timestamp_now = moment();
exports.formattedMTime_now = moment().format('YYYY/MM/DD HH:mm');
exports.formattedSTime_now = moment().format('YYYY/MM/DD HH:mm:ss');
exports.formattedDateTime_now = moment().format('YYYY/MM/DD');
exports.formatted_now = moment().format('YYYYMMDDHHmmss');
//# sourceMappingURL=DateFormat.js.map