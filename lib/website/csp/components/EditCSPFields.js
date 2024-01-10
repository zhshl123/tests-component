"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCsp = exports.csp = exports.EditCSPFields = void 0;
const abstract_1 = require("../../common/abstract");
const CSPAttributes_1 = require("./CSPAttributes");
class EditCSPFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCSPFields = EditCSPFields;
exports.csp = new EditCSPFields(CSPAttributes_1.CSPAttributeMap);
exports.browseCsp = new abstract_1.SearchFromFields(CSPAttributes_1.CSPAttributeMap);
//# sourceMappingURL=EditCSPFields.js.map