"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCsh = exports.csh = exports.EditCSHFields = void 0;
const abstract_1 = require("../../common/abstract");
const CSHAttributes_1 = require("./CSHAttributes");
class EditCSHFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCSHFields = EditCSHFields;
exports.csh = new EditCSHFields(CSHAttributes_1.CSHAttributeMap);
exports.browseCsh = new abstract_1.SearchFromFields(CSHAttributes_1.CSHAttributeMap);
//# sourceMappingURL=EditCSHFields.js.map