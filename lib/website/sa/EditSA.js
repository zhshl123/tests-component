"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SA = exports.EditSA = void 0;
/* eslint-disable unicorn/filename-case */
const abstract_1 = require("../common/abstract");
const SAAttributes_1 = require("./SAAttributes");
class EditSA extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditSA = EditSA;
exports.SA = new EditSA(SAAttributes_1.SAMap);
//# sourceMappingURL=EditSA.js.map