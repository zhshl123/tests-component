"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseSOVItem = exports.BrowseSOVItemFields = void 0;
const abstract_1 = require("../common/abstract");
const SOVItemAttributes_1 = require("./SOVItemAttributes");
class BrowseSOVItemFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseSOVItemFields = BrowseSOVItemFields;
exports.BrowseSOVItem = new BrowseSOVItemFields(SOVItemAttributes_1.SOVItemAttributesMap);
//# sourceMappingURL=BrowseSOVItemFields.js.map