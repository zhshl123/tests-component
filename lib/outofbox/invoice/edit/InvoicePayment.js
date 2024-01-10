"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePayment = void 0;
const web_1 = require("@serenity-js/web");
class InvoicePayment {
}
exports.InvoicePayment = InvoicePayment;
InvoicePayment.invoicePaymentSaveButton = () => web_1.PageElement.located(web_1.By.css(`[name="ctl00$cipActionBar$btnSave"]`))
    .describedAs('Invoice Payment Save Button');
InvoicePayment.invoicePaymentCancelButton = () => web_1.PageElement.located(web_1.By.css(`[name="ctl00$cipActionBar$btnCancel"]`))
    .describedAs('Invoice Payment Cancel Button');
//# sourceMappingURL=InvoicePayment.js.map