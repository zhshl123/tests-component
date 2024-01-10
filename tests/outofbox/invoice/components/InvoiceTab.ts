import { PageTabs } from '../../common/abstract';

export class InvoiceTab extends PageTabs{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
}

const invoiceTabMap = new Map()
invoiceTabMap.set('Line Items', '2')
invoiceTabMap.set('Splitting Line Items', '3')
invoiceTabMap.set('General', '1')

export const invoiceTab = new InvoiceTab(invoiceTabMap)