"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceLineitemAttributeMap = void 0;
exports.invoiceLineitemAttributeMap = new Map();
exports.invoiceLineitemAttributeMap.set('SOV Item', 'SovItemAutoID');
exports.invoiceLineitemAttributeMap.set('(Sub-)Contractor', 'VendorAutoID');
exports.invoiceLineitemAttributeMap.set('Unit', 'UnitID');
exports.invoiceLineitemAttributeMap.set('Unit Price', 'SourceUnitPrice');
exports.invoiceLineitemAttributeMap.set('Quantity', 'Quantity');
exports.invoiceLineitemAttributeMap.set('Amount', 'SourceAmount');
exports.invoiceLineitemAttributeMap.set('Retainage Rate', 'RetainageRate');
exports.invoiceLineitemAttributeMap.set('Retainage', 'SourceRetainage');
exports.invoiceLineitemAttributeMap.set('Amount Less Retainage', 'AmountLessRetainage');
// splitting line item
exports.invoiceLineitemAttributeMap.set('Project', 'ImplementedProjectAutoID');
exports.invoiceLineitemAttributeMap.set('Fund', 'FundID');
exports.invoiceLineitemAttributeMap.set('Percentage', 'Percentage');
exports.invoiceLineitemAttributeMap.set('Amount', 'SourceAmount');
//# sourceMappingURL=InvoiceLineItemAttributes.js.map