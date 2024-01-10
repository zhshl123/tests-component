import { By, PageElement } from '@serenity-js/web';

export class InvoicePayment {

    static invoicePaymentSaveButton = () =>
        PageElement.located(By.css(`[name="ctl00$cipActionBar$btnSave"]`))
    .describedAs('Invoice Payment Save Button')

    static invoicePaymentCancelButton = () =>
        PageElement.located(By.css(`[name="ctl00$cipActionBar$btnCancel"]`))
    .describedAs('Invoice Payment Cancel Button')
}