"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoice = exports.EditInvoiceFields = void 0;
const abstract_1 = require("../../common/abstract");
const InvoiceAttributes_1 = require("./InvoiceAttributes");
class EditInvoiceFields extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.EditInvoiceFields = EditInvoiceFields;
exports.invoice = new EditInvoiceFields(InvoiceAttributes_1.invoiceAttributeMap);
//# sourceMappingURL=EditInvoiceFields.js.map