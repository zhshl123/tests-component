"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAddInvoiceResult = exports.fillDynamicFileds = exports.fillGeneralFields = exports.addInvoiceGeneralInfo = exports.openAddInvoicePageByType = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const CheckTipMessage_1 = require("../common/CheckTipMessage");
const statics_1 = require("../common/statics");
const components_1 = require("./components");
exports.openAddInvoicePageByType = {
    using: (invoiceType) => {
        return core_1.Task.where(`#actor open ${invoiceType} page`, common_1.openPage.using(invoiceTypePageMap.get(invoiceType)));
    }
};
exports.addInvoiceGeneralInfo = {
    using: (invoiceInfo, invoiceNo) => {
        return core_1.Task.where(`#actor submit add invoice form`, exports.fillDynamicFileds.using(invoiceInfo), exports.fillGeneralFields.using(invoiceInfo, invoiceNo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)), web_1.Click.on(components_1.invoiceTab.tabByTabId('General')), core_1.Log.the(web_1.Attribute.called('value').of(components_1.invoice.autoIdInputField('Invoice ID'))), components_1.invoice.setCookie(statics_1.COOKIE_INVOICE_NO, web_1.Attribute.called('value').of(components_1.invoice.autoIdInputField('Invoice ID'))));
    }
};
exports.fillGeneralFields = {
    using: (invoiceInfo, invoiceNo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill invoice general fields`, components_1.invoice.fillTextInputField('MUNIS Invoice Number', invoiceNo + timestamp), components_1.invoice.setCookie(statics_1.COOKIE_MINUS_INVOICE_NO, invoiceNo + timestamp), components_1.invoice.fillDateInputField('Invoice Date', invoiceInfo.InvoiceDate), components_1.invoice.fillDateInputField('Billing Period From', invoiceInfo.BillingPeriodFrom), components_1.invoice.fillDateInputField('Billing Period To', invoiceInfo.BillingPeriodTo), components_1.invoice.fillDateInputField('Payment Due Date', invoiceInfo.PaymentDueDate), components_1.invoice.fillTextInputField('Vendor Address', invoiceInfo.VendorAddress), components_1.invoice.fillTextInputField('Description', invoiceInfo.Description), components_1.invoice.fillNumberInputField('Default Retainage Rate', invoiceInfo.DefaultRetainageRate));
    }
};
exports.fillDynamicFileds = {
    using: (invoiceInfo) => {
        return core_1.Task.where(`#actor fill invoice daynamic fields`, components_1.invoice.selectDropdownItem('Type of Service', invoiceInfo.TypeofService), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Check.whether(components_1.invoice.lookupInputField('Contract'), (0, web_1.isVisible)())
            .andIfSo(components_1.invoice.selectItemInlookupPopup('Contract', invoiceInfo.Contract, 'Contract Name'), components_1.invoice.setCookie(statics_1.COOKIE_CONTRACT_NO, invoiceInfo.Contract), core_1.Wait.for(core_1.Duration.ofSeconds(3))), core_1.Check.whether(components_1.invoice.lookupInputField('Vendor'), (0, web_1.isVisible)()).andIfSo(components_1.invoice.selectItemInlookupPopup('Vendor', invoiceInfo.Vendor, 'Vendor ID'), core_1.Wait.for(core_1.Duration.ofSeconds(3))));
    }
};
const invoiceTypePageMap = new Map();
invoiceTypePageMap.set('Contract-Invoice', statics_1.ADD_CONTRACT_INVOICE);
invoiceTypePageMap.set('Invoice Only', statics_1.ADD_INVOICE_ONLY);
exports.checkAddInvoiceResult = {
    using: (expectedResult) => {
        return expectedResult == DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check add invoice result`, assertions_1.Ensure.eventually(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.MANAGE_INVOICE))) : core_1.Task.where(`#actor check add invoice result`, CheckTipMessage_1.checkTipMessage.using());
    }
};
//# sourceMappingURL=AddInvoice.js.map