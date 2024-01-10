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
const contractTabMap = new Map();
contractTabMap.set('Line Items', '2');
contractTabMap.set('Splitting Line Items', '3');
exports.invoiceTab = new InvoiceTab(contractTabMap);
//# sourceMappingURL=InvoiceTab.js.map