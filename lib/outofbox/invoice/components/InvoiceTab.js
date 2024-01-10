"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceTab = exports.InvoiceTab = void 0;
const abstract_1 = require("../../common/abstract");
class InvoiceTab extends abstract_1.PageTabs {
    constructor(entityMap) {
        super(entityMap);
    }
}
exports.InvoiceTab = InvoiceTab;
const invoiceTabMap = new Map();
invoiceTabMap.set('Line Items', '2');
invoiceTabMap.set('Splitting Line Items', '3');
invoiceTabMap.set('General', '1');
exports.invoiceTab = new InvoiceTab(invoiceTabMap);
//# sourceMappingURL=InvoiceTab.js.map