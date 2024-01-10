"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContractInvoice = exports.deleteInvoice = exports.checkPaidInvoice = exports.checkInvoiceGeneralInfo = exports.updateInvoiceGeneralInfo = exports.payInvoice = exports.checkReadOnlyInvoice = exports.changeInvoiceStatus = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const contract_1 = require("../../contract");
const components_1 = require("../components");
const InvoicePayment_1 = require("./InvoicePayment");
/**
     * 修改invoice状态
     * @returns
     */
exports.changeInvoiceStatus = {
    using: (tartgetStatus) => core_1.Task.where(`#actor change invoice status into ${tartgetStatus}`, components_1.invoice.selectDropdownItem('Invoice Status', tartgetStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)))
};
/**
 * 检查approved后的read only情况
 * @returns
 */
const checkReadOnlyInvoice = () => core_1.Task.where(`#actor check read only invoice`, common_1.checkButtonVisible.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.FAILED), common_1.checkButtonVisible.using(DefaultStaticParams_1.DELETE, DefaultStaticParams_1.FAILED), common_1.checkButtonVisible.using(DefaultStaticParams_1.PAY, DefaultStaticParams_1.SUCCEEDED), 
// line item
components_1.invoiceTab.clickTab('Line Items'), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.LOAD_FROM, DefaultStaticParams_1.FAILED), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.BATCH_DELETE, DefaultStaticParams_1.FAILED), common_1.checkButtonEnable.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.FAILED), 
// splitting line item 
components_1.invoiceTab.clickTab('Splitting Line Items'), (0, common_1.checkGridList)(), common_1.splittingLineitem.clickEditButtonInGrid(), common_1.splittingLineitem.checkButtonEnableInEditSplittingDetailPopup(DefaultStaticParams_1.OK, DefaultStaticParams_1.FAILED));
exports.checkReadOnlyInvoice = checkReadOnlyInvoice;
const payInvoice = () => core_1.Task.where(`#actor pay invoice`, components_1.invoiceTab.clickTab('General'), common_1.clickButton.using(DefaultStaticParams_1.PAY), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Wait.until(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.INVOICE_PAYMENT)), (0, common_1.checkGridList)(), 
// clickButton.using(CANCEL),
web_1.Click.on(InvoicePayment_1.InvoicePayment.invoicePaymentSaveButton()), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Wait.until(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.MANAGE_INVOICE)));
exports.payInvoice = payInvoice;
exports.updateInvoiceGeneralInfo = {
    using: (invoiceNo, invoiceInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor update invoice general information`, components_1.invoice.fillTextInputField('Invoice No.', invoiceNo + timestamp), components_1.invoice.setCookie(statics_1.COOKIE_INVOICE_NO, invoiceNo + timestamp), components_1.invoice.fillDateInputField('Invoice Date', invoiceInfo.InvoiceDate), components_1.invoice.fillDateInputField('Billing Period From', invoiceInfo.BillingPeriodFrom), components_1.invoice.fillDateInputField('Billing Period To', invoiceInfo.BillingPeriodTo), components_1.invoice.fillDateInputField('Payment Due Date', invoiceInfo.PaymentDueDate), components_1.invoice.fillTextInputField('Vendor Address', invoiceInfo.VendorAddress), components_1.invoice.fillTextInputField('Billing Address', invoiceInfo.BillingAddress), components_1.invoice.fillTextInputField('Description', invoiceInfo.Description), components_1.invoice.fillNumberInputField('Default Retainage Rate', invoiceInfo.DefaultRetainageRate), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkInvoiceGeneralInfo = {
    using: (invoiceInfo) => core_1.Task.where(`#actor check invoice general information`, core_1.Check.whether(components_1.invoice.readOnlyLookupFieldBox('Contract'), (0, web_1.isVisible)()).andIfSo(assertions_1.Ensure.eventually(web_1.Text.of(components_1.invoice.readOnlyLookupFieldValue('Contract')), (0, assertions_1.includes)(web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NO).value()))), core_1.Check.whether(components_1.invoice.readOnlyLookupFieldBox('Purchase Order'), (0, web_1.isVisible)()).andIfSo(assertions_1.Ensure.eventually(web_1.Text.of(components_1.invoice.readOnlyLookupFieldValue('Purchase Order')), (0, assertions_1.includes)(web_1.Cookie.called(statics_1.COOKIE_PURCHASE_ORDER_NO).value()))), components_1.invoice.checkReadOnlylookupValue('Vendor', invoiceInfo.Vendor, DefaultStaticParams_1.SUCCEEDED), 
    // invoice.checkReadOnlyLabelValue('Type of Service', invoiceInfo.TypeofService, SUCCEEDED),
    components_1.invoice.checkTextInputFieldValue('Invoice No.', web_1.Cookie.called(statics_1.COOKIE_INVOICE_NO).value(), DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkDropdownInputFieldValue('Invoice Status', invoiceInfo.InvoiceStatus, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkDateInputFieldValue('Invoice Date', invoiceInfo.InvoiceDate, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkDateInputFieldValue('Billing Period From', invoiceInfo.BillingPeriodFrom, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkDateInputFieldValue('Billing Period To', invoiceInfo.BillingPeriodTo, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkDateInputFieldValue('Payment Due Date', invoiceInfo.PaymentDueDate, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkTextInputFieldValue('Billing Address', invoiceInfo.BillingAddress, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkTextInputFieldValue('Vendor Address', invoiceInfo.VendorAddress, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkTextInputFieldValue('Description', invoiceInfo.Description, DefaultStaticParams_1.SUCCEEDED), components_1.invoice.checkNumberInputFieldValue('Default Retainage Rate', invoiceInfo.DefaultRetainageRate, DefaultStaticParams_1.SUCCEEDED))
};
exports.checkPaidInvoice = {
    using: (invoiceStatus) => core_1.Task.where(`#actor check invoice general information`, components_1.invoice.checkDropdownInputFieldValue('Invoice Status', invoiceStatus, DefaultStaticParams_1.SUCCEEDED), common_1.checkButtonVisible.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.FAILED), common_1.checkButtonVisible.using(DefaultStaticParams_1.DELETE, DefaultStaticParams_1.FAILED))
};
const deleteInvoice = () => core_1.Task.where(`#actor check invoice general information`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.deleteInvoice = deleteInvoice;
/**
 * 检查contract的invoice 列表
 * @returns
 */
exports.checkContractInvoice = {
    using: (invoiceNo) => core_1.Task.where(`#actor check contract invoice: ${invoiceNo}`, web_1.Switch.to(contract_1.contract.invoiceTabFrame()), common_1.clickSectionButton.using('Last  Page'), common_1.checkLinkInGridList.using(invoiceNo)
    // )
    )
};
//# sourceMappingURL=InvoiceGerenalInfo.js.map