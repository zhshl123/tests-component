"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseCps = exports.cps = exports.EditCPSFields = void 0;
const abstract_1 = require("../../common/abstract");
const CPSAttributes_1 = require("./CPSAttributes");
class EditCPSFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCPSFields = EditCPSFields;
exports.cps = new EditCPSFields(CPSAttributes_1.CPSAttributeMap);
exports.browseCps = new abstract_1.SearchFromFields(CPSAttributes_1.CPSAttributeMap);
//# sourceMappingURL=EditCPSFields.js.map