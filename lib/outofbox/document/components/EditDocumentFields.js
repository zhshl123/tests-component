"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editDocument = exports.EditDocumentFields = void 0;
const abstract_1 = require("../../common/abstract");
const DocumentAttributes_1 = require("./DocumentAttributes");
class EditDocumentFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditDocumentFields = EditDocumentFields;
exports.editDocument = new EditDocumentFields(DocumentAttributes_1.documentAttributeMap);
//# sourceMappingURL=EditDocumentFields.js.map