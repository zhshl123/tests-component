import { Ensure, includes } from '@serenity-js/assertions';
import { Check, Duration, Question, Task, Wait } from '@serenity-js/core';
import { Click, Cookie, isVisible, Page, Switch, Text } from '@serenity-js/web';

import { BATCH_DELETE, DELETE, FAILED, LOAD_FROM, OK, PAY, SAVE, SUCCEEDED } from '../../../DefaultStaticParams';
import { checkBulkEditSetionButtonVisible, checkButtonEnable, checkButtonVisible, checkGridList, checkLinkInGridList, clickButton, clickMessagePopupButton, clickSectionButton, formatted_now, splittingLineitem, waitMessagePopupBoxVisible } from '../../common';
import { COOKIE_CONTRACT_NO, COOKIE_INVOICE_NO, INVOICE_PAYMENT, MANAGE_INVOICE } from '../../common/statics';
import { contract } from '../../contract/components';
import { invoice, invoiceTab } from '../components';
import { InvoicePayment } from './InvoicePayment';

/**
     * 修改invoice状态
     * @returns 
     */
export const changeInvoiceStatus = {
    using: (tartgetStatus: string | Question<any>) =>
        Task.where(`#actor change invoice status into ${tartgetStatus}`,
            invoice.selectDropdownItem('Invoice Status', tartgetStatus),

            clickButton.using(SAVE),

            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))

        )

}

/**
 * 检查approved后的read only情况
 * @returns 
 */
export const checkReadOnlyInvoice = () =>
    Task.where(`#actor check read only invoice`,
        checkButtonVisible.using(SAVE, FAILED),
        checkButtonVisible.using(DELETE, FAILED),
        checkButtonVisible.using(PAY, SUCCEEDED),

        // line item
        invoiceTab.clickTab('Line Items'),
        checkBulkEditSetionButtonVisible.using(LOAD_FROM, FAILED),
        checkBulkEditSetionButtonVisible.using(BATCH_DELETE, FAILED),
        checkButtonEnable.using(SAVE, FAILED),

        // splitting line item 
        invoiceTab.clickTab('Splitting Line Items'),
        checkGridList(),
        splittingLineitem.clickEditButtonInGrid(),
        splittingLineitem.checkButtonEnableInEditSplittingDetailPopup(OK, FAILED)

    )

export const payInvoice = () =>
    Task.where(`#actor pay invoice`,
        invoiceTab.clickTab('General'),
        clickButton.using(PAY),
        Wait.for(Duration.ofSeconds(5)),
        Wait.until(Page.current().title(), includes(INVOICE_PAYMENT)),
        checkGridList(),
        // clickButton.using(CANCEL),
        Click.on(InvoicePayment.invoicePaymentSaveButton()),

        Wait.for(Duration.ofSeconds(5)),
        Wait.until(Page.current().title(), includes(MANAGE_INVOICE)),

    )

export const updateInvoiceGeneralInfo = {
    using: (invoiceNo: string, invoiceInfo: Record<string, string | Question<any>>) => {
        const timestamp = formatted_now
        return Task.where(`#actor update invoice general information`,
            invoice.fillTextInputField('MUNIS Invoice Number', invoiceNo + timestamp),
            invoice.setCookie(COOKIE_INVOICE_NO, invoiceNo + timestamp),
            invoice.fillDateInputField('Invoice Date', invoiceInfo.InvoiceDate),
            invoice.fillDateInputField('Billing Period From', invoiceInfo.BillingPeriodFrom),
            invoice.fillDateInputField('Billing Period To', invoiceInfo.BillingPeriodTo),
            invoice.fillDateInputField('Payment Due Date', invoiceInfo.PaymentDueDate),
            invoice.fillTextInputField('Vendor Address', invoiceInfo.VendorAddress),
            invoice.fillTextInputField('Description', invoiceInfo.Description),
            invoice.fillNumberInputField('Default Retainage Rate', invoiceInfo.DefaultRetainageRate),

            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))

        )
    }

}

export const checkInvoiceGeneralInfo = {
    using: (invoiceInfo: Record<string, string | Question<any>>) =>
        Task.where(`#actor check invoice general information`,
            Check.whether(
                invoice.readOnlyLookupFieldBox('Contract'), isVisible()
            ).andIfSo(
                Ensure.eventually(Text.of(invoice.readOnlyLookupFieldValue('Contract')), includes(Cookie.called(COOKIE_CONTRACT_NO).value())),
            ),
            invoice.checkReadOnlylookupValue('Vendor', invoiceInfo.Vendor, SUCCEEDED),
            invoice.checkReadOnlyLabelValue('Type of Service', invoiceInfo.TypeofService, SUCCEEDED),
            invoice.checkTextInputFieldValue('MUNIS Invoice Number', Cookie.called(COOKIE_INVOICE_NO).value(), SUCCEEDED),
            invoice.checkDateInputFieldValue('Invoice Date', invoiceInfo.InvoiceDate, SUCCEEDED),
            invoice.checkDateInputFieldValue('Billing Period From', invoiceInfo.BillingPeriodFrom, SUCCEEDED),
            invoice.checkDateInputFieldValue('Billing Period To', invoiceInfo.BillingPeriodTo, SUCCEEDED),
            invoice.checkDateInputFieldValue('Payment Due Date', invoiceInfo.PaymentDueDate, SUCCEEDED),
            invoice.checkTextInputFieldValue('Vendor Address', invoiceInfo.VendorAddress, SUCCEEDED),
            invoice.checkTextInputFieldValue('Description', invoiceInfo.Description, SUCCEEDED),
            invoice.checkNumberInputFieldValue('Default Retainage Rate', invoiceInfo.DefaultRetainageRate, SUCCEEDED),

        )

}

export const deleteInvoice = () =>
    Task.where(`#actor check invoice general information`,
        clickButton.using(DELETE),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))

    )

/**
 * 检查contract的invoice 列表
 * @returns 
 */
export const checkContractInvoice = {
    using: (invoiceNo: string | Question<any>) =>
        Task.where(`#actor check contract invoice: ${invoiceNo}`,
            Switch.to(contract.invoiceTabFrame()),
            clickSectionButton.using('Last  Page'),
            checkLinkInGridList.using(invoiceNo)
            // )

        )

}