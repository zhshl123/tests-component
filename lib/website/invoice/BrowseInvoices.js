"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseInvoices = exports.searchInvoice = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
exports.searchInvoice = {
    using: (invoiceNo) => core_1.Task.where(`#actor search invoice with: ${invoiceNo}`, web_1.Enter.theValue(invoiceNo).into(BrowseInvoices.invoiceNoInputField()), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), (0, common_1.checkGridList)())
};
class BrowseInvoices {
}
exports.BrowseInvoices = BrowseInvoices;
BrowseInvoices.invoiceNoInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_InvoiceNumber_txtText'))
    .describedAs('Invoice No Input Field');
//# sourceMappingURL=BrowseInvoices.js.map