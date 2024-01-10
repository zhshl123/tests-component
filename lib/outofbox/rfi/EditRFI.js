"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFI = exports.EditRFI = void 0;
/* eslint-disable unicorn/filename-case */
const abstract_1 = require("../common/abstract");
const RFIAttributes_1 = require("./RFIAttributes");
class EditRFI extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditRFI = EditRFI;
exports.RFI = new EditRFI(RFIAttributes_1.RFIMap);
//# sourceMappingURL=EditRFI.js.map