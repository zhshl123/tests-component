"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cor = exports.EditCORFields = void 0;
const abstract_1 = require("../../common/abstract");
const corAttributes_1 = require("./corAttributes");
class EditCORFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditCORFields = EditCORFields;
exports.cor = new EditCORFields(corAttributes_1.corAttributeMap);
//# sourceMappingURL=EditCORFields.js.map