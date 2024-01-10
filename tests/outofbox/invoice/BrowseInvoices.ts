import { Task } from '@serenity-js/core';
import { By, Enter, PageElement } from '@serenity-js/web';

import { SEARCH } from '../../DefaultStaticParams';
import { checkGridList, clickButton } from '../common';

export const searchInvoice = {
    using: (invoiceNo: any) =>
        Task.where(`#actor search invoice with: ${invoiceNo}`,
            Enter.theValue(invoiceNo).into(BrowseInvoices.invoiceNoInputField()),
            clickButton.using(SEARCH),
            checkGridList()
        )

}

export class BrowseInvoices {
    static invoiceNoInputField = () =>
        PageElement.located(By.id('ctl00_body_A0_InvoiceNumber_txtText'))
            .describedAs('Invoice No Input Field')

}    

