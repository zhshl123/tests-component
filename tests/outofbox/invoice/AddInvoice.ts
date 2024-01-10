import { Ensure, includes } from '@serenity-js/assertions'
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, isVisible, Page } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage } from '../common';
import { checkTipMessage } from '../common/CheckTipMessage';
import { ADD_CONTRACT_INVOICE, ADD_INVOICE_ONLY, COOKIE_CONTRACT_NO, COOKIE_INVOICE_NO, COOKIE_MINUS_INVOICE_NO, MANAGE_INVOICE } from '../common/statics';
import { invoice, invoiceTab } from './components';

export const openAddInvoicePageByType = {
    using: (invoiceType: string) => {
        return Task.where(`#actor open ${invoiceType} page`,
            openPage.using(invoiceTypePageMap.get(invoiceType)),
        )
    }
}

export const addInvoiceGeneralInfo = {
    using: (invoiceInfo: Record<string, string>, invoiceNo: string) => {
        
        return Task.where(`#actor submit add invoice form`,
            fillDynamicFileds.using(invoiceInfo),
            fillGeneralFields.using(invoiceInfo, invoiceNo),

            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
            Click.on(invoiceTab.tabByTabId('General')),
            Log.the(Attribute.called('value').of(invoice.autoIdInputField('Invoice ID'))),
            invoice.setCookie(COOKIE_INVOICE_NO, Attribute.called('value').of(invoice.autoIdInputField('Invoice ID')))

        )
    }

}

export const fillGeneralFields = {
    using: (invoiceInfo: Record<string, string>, invoiceNo: string) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill invoice general fields`,
            invoice.fillTextInputField('MUNIS Invoice Number', invoiceNo + timestamp),
            invoice.setCookie(COOKIE_MINUS_INVOICE_NO, invoiceNo + timestamp),
            invoice.fillDateInputField('Invoice Date', invoiceInfo.InvoiceDate),
            invoice.fillDateInputField('Billing Period From', invoiceInfo.BillingPeriodFrom),
            invoice.fillDateInputField('Billing Period To', invoiceInfo.BillingPeriodTo),
            invoice.fillDateInputField('Payment Due Date', invoiceInfo.PaymentDueDate),
            invoice.fillTextInputField('Vendor Address', invoiceInfo.VendorAddress),
            invoice.fillTextInputField('Description', invoiceInfo.Description),
            invoice.fillNumberInputField('Default Retainage Rate', invoiceInfo.DefaultRetainageRate),
        )
    }

}

export const fillDynamicFileds = {
    using: (invoiceInfo: Record<string, string>) => {
        return Task.where(`#actor fill invoice daynamic fields`,
            invoice.selectDropdownItem('Type of Service', invoiceInfo.TypeofService),
            Wait.for(Duration.ofSeconds(5)),

            Check.whether(invoice.lookupInputField('Contract'), isVisible())
                .andIfSo(
                    invoice.selectItemInlookupPopup('Contract', invoiceInfo.Contract, 'Contract Name'),
                    invoice.setCookie(COOKIE_CONTRACT_NO, invoiceInfo.Contract),
                    Wait.for(Duration.ofSeconds(3)),
                ),

            Check.whether(invoice.lookupInputField('Vendor'), isVisible()).andIfSo(
                invoice.selectItemInlookupPopup('Vendor', invoiceInfo.Vendor, 'Vendor ID'),
                Wait.for(Duration.ofSeconds(3)),
            ),

        )
    }
}

const invoiceTypePageMap = new Map()
invoiceTypePageMap.set('Contract-Invoice', ADD_CONTRACT_INVOICE)
invoiceTypePageMap.set('Invoice Only', ADD_INVOICE_ONLY)

export const checkAddInvoiceResult = {
    using: (expectedResult: string) => {
        return expectedResult == SUCCEEDED ? Task.where(`#actor check add invoice result`,
            Ensure.eventually(Page.current().title(), includes(MANAGE_INVOICE))
        ) : Task.where(`#actor check add invoice result`,
            checkTipMessage.using()
        );
    }
}

