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
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor submit add invoice form`, exports.fillDynamicFileds.using(invoiceInfo), exports.fillGeneralFields.using(invoiceInfo, invoiceNo), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillGeneralFields = {
    using: (invoiceInfo, invoiceNo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill invoice general fields`, components_1.invoice.fillTextInputField('Invoice No.', invoiceNo + timestamp), components_1.invoice.setCookie(statics_1.COOKIE_INVOICE_NO, invoiceNo + timestamp), components_1.invoice.fillDateInputField('Invoice Date', invoiceInfo.InvoiceDate), components_1.invoice.fillDateInputField('Billing Period From', invoiceInfo.BillingPeriodFrom), components_1.invoice.fillDateInputField('Billing Period To', invoiceInfo.BillingPeriodTo), components_1.invoice.fillDateInputField('Payment Due Date', invoiceInfo.PaymentDueDate), components_1.invoice.fillTextInputField('Vendor Address', invoiceInfo.VendorAddress), components_1.invoice.fillTextInputField('Billing Address', invoiceInfo.BillingAddress), components_1.invoice.fillTextInputField('Description', invoiceInfo.Description), components_1.invoice.fillNumberInputField('Default Retainage Rate', invoiceInfo.DefaultRetainageRate));
    }
};
exports.fillDynamicFileds = {
    using: (invoiceInfo) => {
        return core_1.Task.where(`#actor fill invoice daynamic fields`, 
        // 动态的fields
        core_1.Check.whether(web_1.Attribute.called('aria-disabled').of(components_1.invoice.dropdownField('Type of Service')), (0, assertions_1.equals)('false')).andIfSo(components_1.invoice.selectDropdownItem('Type of Service', invoiceInfo.TypeofService), core_1.Wait.for(core_1.Duration.ofSeconds(5))), core_1.Check.whether(components_1.invoice.lookupInputField('Contract'), (0, web_1.isVisible)())
            .andIfSo(core_1.Check.whether(web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NO).value(), (0, assertions_1.isPresent)()).andIfSo(components_1.invoice.selectItemInlookupPopup('Contract', web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NO).value(), 'Contract No.')).otherwise(components_1.invoice.selectItemInlookupPopup('Contract', invoiceInfo.Contract, 'Contract No.'), components_1.invoice.setCookie(statics_1.COOKIE_CONTRACT_NO, invoiceInfo.Contract)), core_1.Wait.until(components_1.invoice.readOnlyLookupFieldValue('Vendor'), (0, web_1.isVisible)())), core_1.Check.whether(components_1.invoice.lookupInputField('Purchase Order'), (0, web_1.isVisible)())
            .andIfSo(core_1.Check.whether(web_1.Cookie.called(statics_1.COOKIE_PURCHASE_ORDER_NO).value(), (0, assertions_1.isPresent)()).andIfSo(components_1.invoice.selectItemInlookupPopup('Purchase Order', web_1.Cookie.called(statics_1.COOKIE_PURCHASE_ORDER_NO).value(), 'Purchase Order No.')).otherwise(components_1.invoice.selectItemInlookupPopup('Purchase Order', invoiceInfo.PurchaseOrder, 'Purchase Order Name'), components_1.invoice.setCookie(statics_1.COOKIE_PURCHASE_ORDER_NO, invoiceInfo.PurchaseOrder)), core_1.Wait.until(components_1.invoice.readOnlyLookupFieldValue('Vendor'), (0, web_1.isVisible)())), core_1.Check.whether(components_1.invoice.ralationshipAttributeLookupInputField('Inspection Reports'), (0, web_1.isVisible)())
            .andIfSo(web_1.Enter.theValue(invoiceInfo.InspectionReports).into(components_1.invoice.ralationshipAttributeLookupInputField('Inspection Reports')), web_1.Click.on(components_1.invoice.ralationshipAttributeLookupDropdownItem('Inspection Reports', invoiceInfo.InspectionReports)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on(components_1.invoice.attributeNameLabel('Inspection Reports'))), core_1.Check.whether(components_1.invoice.lookupInputField('Vendor'), (0, web_1.isVisible)()).andIfSo(components_1.invoice.selectItemInlookupPopup('Vendor', invoiceInfo.Vendor, 'Vendor ID'), core_1.Wait.for(core_1.Duration.ofSeconds(5))));
    }
};
const invoiceTypePageMap = new Map();
invoiceTypePageMap.set('Contract-Invoice', statics_1.ADD_CONTRACT_INVOICE);
invoiceTypePageMap.set('PO-Invoice', statics_1.ADD_PO_INVOICE);
invoiceTypePageMap.set('Invoice Only', statics_1.ADD_INVOICE_ONLY);
invoiceTypePageMap.set('Contract-Inspection-Invoice', statics_1.ADD_CONTRACT_INSPECTION_INVOICE);
exports.checkAddInvoiceResult = {
    using: (expectedResult) => {
        return expectedResult == DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check add invoice result`, assertions_1.Ensure.eventually(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.MANAGE_INVOICE))) : core_1.Task.where(`#actor check add invoice result`, CheckTipMessage_1.checkTipMessage.using());
    }
};
//# sourceMappingURL=AddInvoice.js.map