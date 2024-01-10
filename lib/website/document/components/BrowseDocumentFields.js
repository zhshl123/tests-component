"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseDocument = exports.BrowseDocumentFields = void 0;
const abstract_1 = require("../../common/abstract");
const DocumentAttributes_1 = require("./DocumentAttributes");
class BrowseDocumentFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseDocumentFields = BrowseDocumentFields;
exports.browseDocument = new BrowseDocumentFields(DocumentAttributes_1.documentAttributeMap);
//# sourceMappingURL=BrowseDocumentFields.js.map