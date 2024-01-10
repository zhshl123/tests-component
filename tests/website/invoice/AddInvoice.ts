import { Ensure, equals, includes, isPresent } from '@serenity-js/assertions'
import { Check, Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, Cookie, Enter, isVisible, Page } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common';
import { checkTipMessage } from '../common/CheckTipMessage';
import { ADD_CONTRACT_INSPECTION_INVOICE, ADD_CONTRACT_INVOICE, ADD_INVOICE_ONLY, ADD_PO_INVOICE, COOKIE_CONTRACT_NO, COOKIE_INVOICE_NO, COOKIE_PURCHASE_ORDER_NO, MANAGE_INVOICE } from '../common/statics';
import { invoice } from './components';

export const openAddInvoicePageByType = {
    using: (invoiceType: string) => {
        return Task.where(`#actor open ${invoiceType} page`,
            openPage.using(invoiceTypePageMap.get(invoiceType)),
        )
    }
}

export const addInvoiceGeneralInfo = {
    using: (invoiceInfo: Record<string, string>, invoiceNo:string) => {
        const timestamp = formatted_now
        return Task.where(`#actor submit add invoice form`,
            fillDynamicFileds.using(invoiceInfo),
            fillGeneralFields.using(invoiceInfo, invoiceNo),

            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5))

        )
    }

}

export const fillGeneralFields = {
    using: (invoiceInfo: Record<string, string>, invoiceNo:string) => {
        const timestamp = formatted_now
        return Task.where(`#actor fill invoice general fields`,
            invoice.fillTextInputField('Invoice No.', invoiceNo + timestamp),
            invoice.setCookie(COOKIE_INVOICE_NO, invoiceNo + timestamp),
            invoice.fillDateInputField('Invoice Date', invoiceInfo.InvoiceDate),
            invoice.fillDateInputField('Billing Period From', invoiceInfo.BillingPeriodFrom),
            invoice.fillDateInputField('Billing Period To', invoiceInfo.BillingPeriodTo),
            invoice.fillDateInputField('Payment Due Date', invoiceInfo.PaymentDueDate),
            invoice.fillTextInputField('Vendor Address', invoiceInfo.VendorAddress),
            invoice.fillTextInputField('Billing Address', invoiceInfo.BillingAddress),
            invoice.fillTextInputField('Description', invoiceInfo.Description),
            invoice.fillNumberInputField('Default Retainage Rate', invoiceInfo.DefaultRetainageRate),
        )
    }

}

export const fillDynamicFileds = {
    using: (invoiceInfo: Record<string, string>) => {
        return Task.where(`#actor fill invoice daynamic fields`,
            // 动态的fields
            Check.whether(
                Attribute.called('aria-disabled').of(invoice.dropdownField('Type of Service')), equals('false')
            ).andIfSo(
                invoice.selectDropdownItem('Type of Service', invoiceInfo.TypeofService),
                Wait.for(Duration.ofSeconds(5))
            ),

            Check.whether(invoice.lookupInputField('Contract'), isVisible())
                .andIfSo(
                    Check.whether(
                        Cookie.called(COOKIE_CONTRACT_NO).value(), isPresent()
                    ).andIfSo(
                        invoice.selectItemInlookupPopup('Contract', Cookie.called(COOKIE_CONTRACT_NO).value(), 'Contract No.'),
                    ).otherwise(
                        invoice.selectItemInlookupPopup('Contract', invoiceInfo.Contract, 'Contract No.'),
                        invoice.setCookie(COOKIE_CONTRACT_NO, invoiceInfo.Contract),
                    ),
                    Wait.until(invoice.readOnlyLookupFieldValue('Vendor'), isVisible())
                ),

            Check.whether(invoice.lookupInputField('Purchase Order'), isVisible())
                .andIfSo(
                    Check.whether(
                        Cookie.called(COOKIE_PURCHASE_ORDER_NO).value(), isPresent()
                    ).andIfSo(
                        invoice.selectItemInlookupPopup('Purchase Order', Cookie.called(COOKIE_PURCHASE_ORDER_NO).value(), 'Purchase Order No.'),
                    ).otherwise(
                        invoice.selectItemInlookupPopup('Purchase Order', invoiceInfo.PurchaseOrder, 'Purchase Order Name'),
                        invoice.setCookie(COOKIE_PURCHASE_ORDER_NO, invoiceInfo.PurchaseOrder),
                    ),
                    Wait.until(invoice.readOnlyLookupFieldValue('Vendor'), isVisible())
                ),

            Check.whether(invoice.ralationshipAttributeLookupInputField('Inspection Reports'), isVisible())
                .andIfSo(
                    
                    Enter.theValue(invoiceInfo.InspectionReports).into(invoice.ralationshipAttributeLookupInputField('Inspection Reports')),
                    Click.on(invoice.ralationshipAttributeLookupDropdownItem('Inspection Reports',invoiceInfo.InspectionReports )),
                    Wait.for(Duration.ofSeconds(2)),
                    Click.on(invoice.attributeNameLabel('Inspection Reports'))
                ),

            Check.whether(invoice.lookupInputField('Vendor'), isVisible()).andIfSo(
                invoice.selectItemInlookupPopup('Vendor', invoiceInfo.Vendor, 'Vendor ID'),
                Wait.for(Duration.ofSeconds(5)),
            ),

        )
    }
}

const invoiceTypePageMap = new Map()
invoiceTypePageMap.set('Contract-Invoice', ADD_CONTRACT_INVOICE)
invoiceTypePageMap.set('PO-Invoice', ADD_PO_INVOICE)
invoiceTypePageMap.set('Invoice Only', ADD_INVOICE_ONLY)
invoiceTypePageMap.set('Contract-Inspection-Invoice', ADD_CONTRACT_INSPECTION_INVOICE)

export const checkAddInvoiceResult = {
    using: (expectedResult: string) => {
        return expectedResult == SUCCEEDED ? Task.where(`#actor check add invoice result`,
            Ensure.eventually(Page.current().title(), includes(MANAGE_INVOICE))
        ) : Task.where(`#actor check add invoice result`,
            checkTipMessage.using()
        );
    }
}

