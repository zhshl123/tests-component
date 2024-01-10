"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCO = exports.CO = exports.EditCOFields = void 0;
const abstract_1 = require("../../common/abstract");
const COAttributes_1 = require("./COAttributes");
class EditCOFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCOFields = EditCOFields;
exports.CO = new EditCOFields(COAttributes_1.COAttributeMap);
exports.browseCO = new abstract_1.SearchFromFields(COAttributes_1.COAttributeMap);
//# sourceMappingURL=EditCOFields.js.map