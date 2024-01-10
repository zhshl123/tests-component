"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseInvoice = exports.BrowseInvoiceFields = void 0;
const abstract_1 = require("../../common/abstract");
const BrowseInvoiceAttributes_1 = require("./BrowseInvoiceAttributes");
class BrowseInvoiceFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.BrowseInvoiceFields = BrowseInvoiceFields;
exports.browseInvoice = new BrowseInvoiceFields(BrowseInvoiceAttributes_1.browseInvoiceAttributeMap);
//# sourceMappingURL=BrowseInvoiceFields.js.map