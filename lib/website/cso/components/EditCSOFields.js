"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCso = exports.cso = exports.EditCSOFields = void 0;
const abstract_1 = require("../../common/abstract");
const CSOAttributes_1 = require("./CSOAttributes");
class EditCSOFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCSOFields = EditCSOFields;
exports.cso = new EditCSOFields(CSOAttributes_1.CSOAttributeMap);
exports.browseCso = new abstract_1.SearchFromFields(CSOAttributes_1.CSOAttributeMap);
//# sourceMappingURL=EditCSOFields.js.map