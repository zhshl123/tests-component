"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSI = exports.EditDSI = void 0;
/* eslint-disable unicorn/filename-case */
const abstract_1 = require("../common/abstract");
const DSIAttributes_1 = require("./DSIAttributes");
class EditDSI extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditDSI = EditDSI;
exports.DSI = new EditDSI(DSIAttributes_1.DSIMap);
//# sourceMappingURL=EditDSI.js.map